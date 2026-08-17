-- Mirror Luma guest registrations for Currents reporting and product workflows.

create table if not exists luma_webhook_deliveries (
  webhook_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now()
);

create table if not exists luma_event_registrations (
  luma_guest_id text primary key,
  luma_event_id text not null,
  event_name text,
  event_start_at timestamptz,
  user_email text,
  user_name text,
  approval_status text not null,
  registered_at timestamptz,
  last_webhook_id text not null references luma_webhook_deliveries(webhook_id),
  raw_payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists luma_event_registrations_event_id_idx
  on luma_event_registrations (luma_event_id);

create index if not exists luma_event_registrations_email_idx
  on luma_event_registrations (lower(user_email));
