-- Realign member_applications.category with the current audience segmentation:
-- Founder / Investor / Operator / Eco-System (replaces the earlier Innovator label).

update member_applications set category = 'Operator' where category = 'Innovator';

alter table member_applications drop constraint member_applications_category_check;

alter table member_applications
  add constraint member_applications_category_check
  check (category in ('Founder', 'Investor', 'Operator', 'Eco-System'));
