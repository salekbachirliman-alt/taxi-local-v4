alter table public.rides
  add column if not exists scheduled_for timestamptz null;

create index if not exists rides_scheduled_for_idx
  on public.rides (scheduled_for)
  where scheduled_for is not null;
