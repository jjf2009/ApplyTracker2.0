-- ============================================================
-- ApplyTracker 2.0 — Supabase Schema Migration
-- Following Postgres best practices:
--   • bigint identity PKs (SQL-standard, sequential, 8 bytes)
--   • timestamptz over timestamp (timezone-aware)
--   • text over varchar (same perf, no artificial limit)
--   • Lowercase snake_case identifiers
--   • RLS with optimized (select auth.uid()) pattern
--   • Indexes on FK and filter columns
-- ============================================================

-- 1. Profiles table (extends auth.users with app-specific data)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can only read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);


-- 2. Applications table
create table if not exists public.applications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  role text not null,
  status text not null default 'APPLIED'
    check (status in ('APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED')),
  method text not null default 'OFFICAL MEANS'
    check (method in ('COLD EMAIL', 'OFFICAL MEANS')),
  applied_date timestamptz not null default now(),
  notes text,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.applications enable row level security;

-- RLS policies: users can only CRUD their own applications
-- Using (select auth.uid()) pattern — called once per query, not per row
create policy "Users can view own applications"
  on public.applications for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own applications"
  on public.applications for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own applications"
  on public.applications for update
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can delete own applications"
  on public.applications for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 3. Indexes (following best practices: index FK columns + common filters)
-- FK index on user_id for fast JOINs and CASCADE
create index if not exists applications_user_id_idx
  on public.applications (user_id);

-- Composite index for the most common query: "get my apps ordered by date"
create index if not exists applications_user_id_applied_date_idx
  on public.applications (user_id, applied_date desc);

-- Partial index for active applications (APPLIED + INTERVIEW are queried most)
create index if not exists applications_active_status_idx
  on public.applications (user_id, status)
  where status in ('APPLIED', 'INTERVIEW');


-- 4. Auto-create profile on signup via trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', 'User')
  );
  return new;
end;
$$;

-- Drop trigger if exists then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
