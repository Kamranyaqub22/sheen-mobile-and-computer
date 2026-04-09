create extension if not exists pgcrypto;

create table if not exists public.admin_emails (
  email text primary key,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.admin_emails enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails
    where email = lower(auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Admin emails are private" on public.admin_emails;
create policy "Admin emails are private"
on public.admin_emails
for select
to authenticated
using (false);

create table if not exists public.repair_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text not null default '',
  hero_title text not null default '',
  hero_body text not null default '',
  accent text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.repair_brands (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.repair_categories(id) on delete cascade,
  slug text not null,
  name text not null,
  summary text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (category_id, slug)
);

create table if not exists public.repair_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.repair_brands(id) on delete cascade,
  slug text not null,
  name text not null,
  summary text not null default '',
  turnaround text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (brand_id, slug)
);

create table if not exists public.repair_services (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.repair_models(id) on delete cascade,
  slug text not null,
  name text not null,
  price numeric(10, 2) not null default 0,
  turnaround text not null default '',
  warranty text not null default '',
  notes text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (model_id, slug)
);

create table if not exists public.repair_bookings (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.repair_categories(id) on delete set null,
  brand_id uuid references public.repair_brands(id) on delete set null,
  model_id uuid references public.repair_models(id) on delete set null,
  repair_service_id uuid references public.repair_services(id) on delete set null,
  category_name text not null,
  brand_name text not null,
  model_name text not null,
  repair_name text not null,
  estimated_price numeric(10, 2),
  turnaround text,
  customer_name text not null,
  phone text not null,
  email text,
  preferred_contact text not null default 'Phone',
  preferred_window text not null default 'As soon as possible',
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'completed', 'archived')),
  submitted_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists repair_categories_set_updated_at on public.repair_categories;
create trigger repair_categories_set_updated_at
before update on public.repair_categories
for each row execute function public.set_updated_at();

drop trigger if exists repair_brands_set_updated_at on public.repair_brands;
create trigger repair_brands_set_updated_at
before update on public.repair_brands
for each row execute function public.set_updated_at();

drop trigger if exists repair_models_set_updated_at on public.repair_models;
create trigger repair_models_set_updated_at
before update on public.repair_models
for each row execute function public.set_updated_at();

drop trigger if exists repair_services_set_updated_at on public.repair_services;
create trigger repair_services_set_updated_at
before update on public.repair_services
for each row execute function public.set_updated_at();

alter table public.repair_categories enable row level security;
alter table public.repair_brands enable row level security;
alter table public.repair_models enable row level security;
alter table public.repair_services enable row level security;
alter table public.repair_bookings enable row level security;

drop policy if exists "Repair categories are public readable" on public.repair_categories;
create policy "Repair categories are public readable"
on public.repair_categories
for select
to anon, authenticated
using (true);

drop policy if exists "Repair categories are admin writable" on public.repair_categories;
create policy "Repair categories are admin writable"
on public.repair_categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Repair brands are public readable" on public.repair_brands;
create policy "Repair brands are public readable"
on public.repair_brands
for select
to anon, authenticated
using (true);

drop policy if exists "Repair brands are admin writable" on public.repair_brands;
create policy "Repair brands are admin writable"
on public.repair_brands
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Repair models are public readable" on public.repair_models;
create policy "Repair models are public readable"
on public.repair_models
for select
to anon, authenticated
using (true);

drop policy if exists "Repair models are admin writable" on public.repair_models;
create policy "Repair models are admin writable"
on public.repair_models
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Repair services are public readable" on public.repair_services;
create policy "Repair services are public readable"
on public.repair_services
for select
to anon, authenticated
using (true);

drop policy if exists "Repair services are admin writable" on public.repair_services;
create policy "Repair services are admin writable"
on public.repair_services
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Repair bookings can be created by everyone" on public.repair_bookings;
create policy "Repair bookings can be created by everyone"
on public.repair_bookings
for insert
to anon, authenticated
with check (true);

drop policy if exists "Repair bookings are admin readable" on public.repair_bookings;
create policy "Repair bookings are admin readable"
on public.repair_bookings
for select
to authenticated
using (public.is_admin());

drop policy if exists "Repair bookings are admin writable" on public.repair_bookings;
create policy "Repair bookings are admin writable"
on public.repair_bookings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Repair bookings are admin deletable" on public.repair_bookings;
create policy "Repair bookings are admin deletable"
on public.repair_bookings
for delete
to authenticated
using (public.is_admin());

create index if not exists repair_brands_category_position_idx on public.repair_brands (category_id, position, name);
create index if not exists repair_models_brand_position_idx on public.repair_models (brand_id, position, name);
create index if not exists repair_services_model_position_idx on public.repair_services (model_id, position, name);
create index if not exists repair_bookings_status_submitted_idx on public.repair_bookings (status, submitted_at desc);