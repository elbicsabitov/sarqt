-- 0002_rls.sql — sarqt v1 RLS policies

alter table public.profiles enable row level security;
alter table public.offers enable row level security;
alter table public.volunteer_signups enable row level security;

-- profiles: только своя строка. DELETE-политики намеренно нет — профиль
-- удаляется только каскадом при удалении auth.users (0001_schema.sql).
create policy profiles_select_own on public.profiles
  for select using (id = (select auth.uid()));
create policy profiles_insert_own on public.profiles
  for insert with check (id = (select auth.uid()));
create policy profiles_update_own on public.profiles
  for update using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- offers: публично читаются active+непротухшие; владелец видит свои; пишет только владелец
create policy offers_select_public on public.offers
  for select using (
    (status = 'active' and expires_at > now())
    or author_id = (select auth.uid())
  );
create policy offers_insert_own on public.offers
  for insert with check (
    author_id = (select auth.uid())
    and (
      select count(*) from public.offers o
      where o.author_id = (select auth.uid()) and o.status = 'active'
    ) < 10
  );
create policy offers_update_own on public.offers
  for update using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));
create policy offers_delete_own on public.offers
  for delete using (author_id = (select auth.uid()));

-- volunteer_signups: вставка открыта всем (контакт-форма), чтение — только service_role
create policy volunteer_insert_any on public.volunteer_signups
  for insert with check (true);
