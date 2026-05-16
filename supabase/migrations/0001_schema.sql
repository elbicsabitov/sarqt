-- 0001_schema.sql — sarqt v1 schema

-- profiles: 1 строка на зарегистрированного пользователя
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  phone text not null default '',
  region text,
  tg text,
  created_at timestamptz not null default now(),
  -- KYC-ready (Фаза L) — не используются в v1:
  phone_verified boolean not null default false,
  identity_verified boolean not null default false,
  liability_signed_at timestamptz,
  kyc_ref text
);

-- offers
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('restaurant', 'event', 'home')),
  event_type text,
  name text not null,
  region text not null,
  what text not null check (char_length(what) >= 5),
  amount text,
  photo_url text not null,
  pickup_from text,
  pickup_to text,
  expires_at timestamptz not null,
  contact_phone text not null,
  contact_tg text,
  status text not null default 'active' check (status in ('active', 'taken', 'removed')),
  created_at timestamptz not null default now(),
  taken_at timestamptz
);
create index offers_feed_idx on public.offers (status, expires_at);
create index offers_author_idx on public.offers (author_id);

-- volunteer_signups
create table public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null,
  role text not null,
  name text not null,
  contact text not null,
  region text not null,
  skills text,
  hours text not null,
  created_at timestamptz not null default now()
);

-- авто-создание профиля при регистрации
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, phone, region, tg)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    new.raw_user_meta_data ->> 'region',
    new.raw_user_meta_data ->> 'tg'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
