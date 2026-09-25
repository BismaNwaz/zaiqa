-- Zaiqa Food Marketplace — Supabase Schema
-- Run this in your Supabase SQL Editor

-- ─── CATEGORIES ───────────────────────────────────────────────────────────────
create table if not exists categories (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  emoji       text,
  created_at  timestamptz default now()
);

-- ─── PRODUCTS ─────────────────────────────────────────────────────────────────
create table if not exists products (
  id             text primary key default gen_random_uuid()::text,
  name           text not null,
  description    text,
  price          numeric(10, 2) not null,
  image_url      text,
  category_id    text references categories(id) on delete set null,
  rating         numeric(3, 1) default 4.5,
  reviews_count  integer default 0,
  is_featured    boolean default false,
  in_stock       boolean default true,
  weight         text,
  origin         text,
  spice_level    text check (spice_level in ('mild', 'medium', 'hot', 'extra-hot')),
  ingredients    text,
  serves         integer,
  created_at     timestamptz default now()
);

-- ─── ORDERS ───────────────────────────────────────────────────────────────────
create table if not exists orders (
  id                text primary key default gen_random_uuid()::text,
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text,
  delivery_address  text not null,
  items             jsonb not null default '[]',
  subtotal          numeric(10, 2) not null,
  delivery_fee      numeric(10, 2) default 0,
  total             numeric(10, 2) not null,
  status            text default 'confirmed'
                    check (status in ('pending','confirmed','preparing','out_for_delivery','delivered')),
  payment_method    text default 'card',
  notes             text,
  created_at        timestamptz default now()
);

-- ─── RLS (Row-Level Security) ─────────────────────────────────────────────────
-- Allow public reads on categories and products
alter table categories enable row level security;
alter table products    enable row level security;
alter table orders      enable row level security;

create policy "Public read categories"  on categories for select using (true);
create policy "Public read products"    on products    for select using (true);
create policy "Public insert orders"    on orders      for insert with check (true);
create policy "Public read own orders"  on orders      for select using (true);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists products_category_idx   on products(category_id);
create index if not exists products_featured_idx   on products(is_featured) where is_featured = true;
create index if not exists products_name_idx       on products using gin(to_tsvector('english', name));
create index if not exists orders_email_idx        on orders(customer_email);
create index if not exists orders_created_idx      on orders(created_at desc);
