-- 0007_security_hardening.sql — sarqt v1
-- Closes security-audit (2026-05-16) findings H-1, H-2, H-3, M-3, M-4.
-- Applied live to project sarqt-eu via the Supabase SQL editor.
-- Wrapped in a transaction: if existing data violates a new CHECK, the
-- whole migration rolls back cleanly.

begin;

-- ============================================================
-- H-3 / M-3 — upper length bounds on every user-supplied text column.
-- Without these, an attacker can insert multi-MB strings and exhaust the
-- Free-tier database (whole-project DoS). Cheap, additive defence.
-- ============================================================
alter table public.offers
  add constraint offers_name_len     check (char_length(name) <= 120),
  add constraint offers_what_len     check (char_length(what) <= 2000),
  add constraint offers_amount_len   check (amount is null or char_length(amount) <= 200),
  add constraint offers_region_len   check (char_length(region) <= 64),
  add constraint offers_event_len    check (event_type is null or char_length(event_type) <= 40),
  add constraint offers_phone_len    check (char_length(contact_phone) <= 40),
  add constraint offers_tg_len       check (contact_tg is null or char_length(contact_tg) <= 64),
  add constraint offers_pickup_f_len check (pickup_from is null or char_length(pickup_from) <= 16),
  add constraint offers_pickup_t_len check (pickup_to is null or char_length(pickup_to) <= 16),
  add constraint offers_photo_len    check (char_length(photo_url) <= 600);

alter table public.volunteer_signups
  add constraint vol_role_len    check (char_length(role) <= 40),
  add constraint vol_name_len    check (char_length(name) <= 120),
  add constraint vol_contact_len check (char_length(contact) <= 120),
  add constraint vol_region_len  check (char_length(region) <= 120),
  add constraint vol_skills_len  check (skills is null or char_length(skills) <= 1000),
  add constraint vol_hours_len   check (char_length(hours) <= 16);

alter table public.profiles
  add constraint profiles_name_len   check (char_length(display_name) <= 120),
  add constraint profiles_phone_len  check (char_length(phone) <= 40),
  add constraint profiles_region_len check (region is null or char_length(region) <= 64),
  add constraint profiles_tg_len     check (tg is null or char_length(tg) <= 64);

-- ============================================================
-- H-1 — offers are immutable after publication. The UPDATE RLS policy
-- only checks ownership, not WHICH columns change — so a user could
-- rewrite their own published offer's photo/description/expiry, or flip
-- a `taken` ledger entry back to `active`. This trigger pins every
-- content column and forbids reverse status transitions. The only
-- legal updates remain: active -> taken / active -> removed (+ taken_at).
-- ============================================================
create or replace function public.offers_guard_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.author_id     is distinct from old.author_id
     or new.created_at  is distinct from old.created_at
     or new.mode        is distinct from old.mode
     or new.event_type  is distinct from old.event_type
     or new.name        is distinct from old.name
     or new.region      is distinct from old.region
     or new.what        is distinct from old.what
     or new.amount      is distinct from old.amount
     or new.photo_url   is distinct from old.photo_url
     or new.expires_at  is distinct from old.expires_at
     or new.pickup_from is distinct from old.pickup_from
     or new.pickup_to   is distinct from old.pickup_to
     or new.contact_phone is distinct from old.contact_phone
     or new.contact_tg  is distinct from old.contact_tg
  then
    raise exception 'offer content is immutable after publication';
  end if;
  if new.status is distinct from old.status and old.status <> 'active' then
    raise exception 'offer status is final once taken or removed';
  end if;
  return new;
end;
$$;

drop trigger if exists offers_guard_update on public.offers;
create trigger offers_guard_update
  before update on public.offers
  for each row execute function public.offers_guard_update();

-- ============================================================
-- H-2 — contact_phone / contact_tg must not be bulk-harvestable.
-- Today any anon client can `select contact_phone from offers` and dump
-- every poster's number in one request. Fix: drop table-wide SELECT,
-- grant SELECT only on the 15 non-contact columns, and serve a single
-- offer's contact through a SECURITY DEFINER RPC that mirrors the read
-- policy. Bulk harvest now needs one RPC call per offer (rate-limitable)
-- instead of a single query.
-- ============================================================
revoke select on public.offers from anon, authenticated;
grant select (
  id, author_id, mode, event_type, name, region, what, amount,
  photo_url, pickup_from, pickup_to, expires_at, status, created_at, taken_at
) on public.offers to anon, authenticated;

create or replace function public.get_offer_contact(p_offer_id uuid)
returns table (contact_phone text, contact_tg text)
language sql
security definer
set search_path = ''
stable
as $$
  select o.contact_phone, o.contact_tg
  from public.offers o
  where o.id = p_offer_id
    and (
      (o.status = 'active' and o.expires_at > now())
      or o.author_id = auth.uid()
    )
$$;

revoke all on function public.get_offer_contact(uuid) from public;
grant execute on function public.get_offer_contact(uuid) to anon, authenticated;

-- ============================================================
-- M-4 — offer-photos bucket accepted any file type/size. A direct
-- Storage API call could upload arbitrary HTML/SVG (phishing host on
-- the supabase.co domain) or fill the storage quota. Enforce server-side.
-- ============================================================
update storage.buckets
  set file_size_limit = 5242880,  -- 5 MB
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
  where id = 'offer-photos';

commit;
