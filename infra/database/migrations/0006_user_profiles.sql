-- App-owned profile data, separate from Better Auth's auth-only tables.

create table if not exists user_profiles (
  id bigserial primary key,
  user_id text not null unique references "user"("id") on delete cascade,
  avatar_url text,
  luma_email text,
  member_application_id bigint references member_applications(id) on delete set null,
  whatsapp_invite_requested_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Prevents two different accounts from ever claiming the same application row.
create unique index if not exists user_profiles_member_application_id_key
  on user_profiles (member_application_id)
  where member_application_id is not null;

create index if not exists user_profiles_luma_email_idx
  on user_profiles (lower(luma_email));
