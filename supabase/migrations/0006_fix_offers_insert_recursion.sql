-- 0006_fix_offers_insert_recursion.sql — sarqt v1
-- BUG (found live during testing): "infinite recursion detected in policy for
-- relation offers" when publishing an offer. The offers INSERT policy
-- (0002_rls.sql) enforced the ≤10-active anti-spam cap with a subquery
-- `select count(*) from public.offers` — reading offers from inside an offers
-- RLS policy re-enters offers' RLS, and Postgres' recursion guard aborts the
-- INSERT.
-- Fix: move the count into a SECURITY DEFINER function. It runs as the table
-- owner, bypasses RLS, so there is no policy re-entry and no recursion.
-- auth.uid() still reads the caller's JWT (request context — unaffected by
-- SECURITY DEFINER), so the function counts the caller's own active offers.

create or replace function public.active_offer_count()
returns integer
language sql
security definer
set search_path = ''
stable
as $$
  select count(*)::integer from public.offers
  where author_id = (select auth.uid()) and status = 'active'
$$;

revoke all on function public.active_offer_count() from public;
grant execute on function public.active_offer_count() to authenticated;

drop policy offers_insert_own on public.offers;
create policy offers_insert_own on public.offers
  for insert to authenticated with check (
    author_id = (select auth.uid())
    and public.active_offer_count() < 10
  );
