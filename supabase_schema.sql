-- Run this in Supabase: Dashboard → SQL Editor → New query → paste → Run

-- 1. Table: one row per user, holding their fridge contents and saved recipes.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  fridge jsonb not null default '[]'::jsonb,
  saved jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Enable Row Level Security — without this, RLS policies below have no effect
-- and (depending on project defaults) the table could be wide open.
alter table public.profiles enable row level security;

-- 3. Policies: a user can only select/insert/update their own row.
-- (No delete policy — users don't need to delete their profile row.)
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Keep updated_at fresh on every write.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();
