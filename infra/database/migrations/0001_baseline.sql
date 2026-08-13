-- Currents baseline schema.
-- Applied migrations are immutable: add NNNN_description.sql for future changes.

create table if not exists app_meta (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

insert into app_meta (key, value)
values ('schema_baseline', '0001_baseline')
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
