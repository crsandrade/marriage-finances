create table if not exists public.transactions (
  id text primary key,
  type text check (type in ('income','expense')) not null,
  owner text check (owner in ('person1','person2','shared')) not null,
  category text not null,
  amount numeric not null,
  description text not null,
  date date not null,
  isRecurring boolean not null default false,
  isInstallment boolean not null default false,
  installmentCurrent integer,
  installmentTotal integer
);

alter table public.transactions enable row level security;

