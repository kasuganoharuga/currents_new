create table if not exists member_applications (
  id bigserial primary key,
  name text not null,
  email text not null,
  location text,
  whatsapp text,
  linkedin_url text,
  category text not null check (category in ('Founder', 'Investor', 'Innovator')),
  looking_for text,
  heard_about text,
  created_at timestamptz not null default now()
);

create index if not exists member_applications_email_idx
  on member_applications (lower(email));
