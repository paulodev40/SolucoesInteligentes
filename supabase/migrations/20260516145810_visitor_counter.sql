create table if not exists public.site_visitors (
  site text primary key,
  total bigint not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.increment_site_visitors(p_site text default 'main')
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
  v_seed bigint := 4950;
begin
  insert into public.site_visitors (site, total)
  values (p_site, v_seed + 1)
  on conflict (site)
  do update set
    total = public.site_visitors.total + 1,
    updated_at = now()
  returning total into v_total;

  return v_total;
end;
$$;

create or replace function public.get_site_visitors(p_site text default 'main')
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
  v_seed bigint := 4950;
begin
  select total into v_total
  from public.site_visitors
  where site = p_site;

  if v_total is null then
    insert into public.site_visitors (site, total)
    values (p_site, v_seed)
    on conflict (site) do nothing;

    select total into v_total
    from public.site_visitors
    where site = p_site;
  end if;

  return coalesce(v_total, 0);
end;
$$;

grant execute on function public.increment_site_visitors(text) to anon, authenticated, service_role;
grant execute on function public.get_site_visitors(text) to anon, authenticated, service_role;