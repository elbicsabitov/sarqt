-- 0005_ledger_view.sql — sarqt v1
-- Public ledger. The RLS policy offers_select_public only exposes active +
-- unexpired rows (or your own), so taken offers are not directly client-
-- readable — and exposing them raw would leak contact_phone / contact_tg.
-- This view projects ONLY the anonymized columns of taken offers (no name,
-- no contacts, no author_id) and runs with definer rights, so anon can read
-- the public /ledger without seeing protected columns or rows of `offers`.
--
-- SECURITY: a new view in `public` inherits Supabase's default ALL-privileges
-- grant to anon/authenticated. This view is auto-updatable, so leaving that
-- grant would let anon UPDATE/DELETE through it into `offers`, bypassing RLS
-- (e.g. `delete from ledger` -> wipes every taken offer). So we revoke all
-- privileges and grant back only SELECT — the view is strictly read-only.
-- (The Supabase advisor flags "security definer view" — intentional here:
-- a deliberate anonymized read-only projection.)

create or replace view public.ledger as
  select id, mode, event_type, what, region, taken_at
  from public.offers
  where status = 'taken';

revoke all on public.ledger from anon, authenticated;
grant select on public.ledger to anon, authenticated;
