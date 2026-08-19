-- V1 signup form redesign: structured Country/State/City (replacing free-text
-- `location`) and a role value decoupled from its display label.

alter table member_applications
  add column if not exists country_code text,
  add column if not exists country_name text,
  add column if not exists state_code text,
  add column if not exists state_name text,
  add column if not exists city_id text,
  add column if not exists city_name text;

-- `location` is left in place (historical rows) but is no longer written to.

update member_applications
set category = case category
  when 'Founder' then 'founder'
  when 'Investor' then 'investor'
  when 'Operator' then 'operator'
  when 'Eco-System' then 'ecosystem'
  else category
end;

alter table member_applications drop constraint member_applications_category_check;

alter table member_applications
  add constraint member_applications_category_check
  check (category in ('founder', 'investor', 'operator', 'ecosystem'));
