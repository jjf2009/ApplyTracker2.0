-- Update applications table with new fields
alter table public.applications 
add column if not exists salary_range text,
add column if not exists interview_date timestamptz,
add column if not exists location text;

-- Add index on common search fields for performance
create index if not exists applications_company_role_idx on public.applications (company, role);
