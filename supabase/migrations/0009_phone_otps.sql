-- 0009_phone_otps.sql — серверная таблица одноразовых кодов SMS-верификации.
-- Спека: docs/superpowers/specs/2026-05-18-auth-recovery-identity-design.md §4.
-- Server-only: RLS включён, клиентских политик НЕТ → ни anon, ни authenticated
-- к таблице доступа не имеют. Пишет/читает ТОЛЬКО Edge Function под service_role
-- (service_role обходит RLS). Код хранится ХЕШЕМ (sha-256 hex), не в открытом виде.
--
-- ПРИМЕНЕНИЕ: выполнить в SQL editor Supabase `sarqt-eu` ПЕРЕД деплоем
-- Edge Functions send-otp/verify-otp. Безопасно применять заранее — таблица
-- ничем не пользуется, пока функции не задеплоены и флоу не включён.

create table public.phone_otps (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  phone       text not null,
  code_hash   text not null,
  expires_at  timestamptz not null,
  attempts    integer not null default 0,
  created_at  timestamptz not null default now(),
  consumed_at timestamptz
);

-- Rate-limit / circuit-breaker читают по этим окнам:
create index phone_otps_user_created on public.phone_otps (user_id, created_at desc);
create index phone_otps_phone_created on public.phone_otps (phone, created_at desc);

-- Server-only: RLS включён, политик НЕТ. service_role (Edge) обходит RLS;
-- anon/authenticated получают ноль строк и не могут писать.
alter table public.phone_otps enable row level security;

revoke all on table public.phone_otps from anon, authenticated;
