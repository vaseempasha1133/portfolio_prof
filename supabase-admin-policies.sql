-- Replace YOUR_ADMIN_USER_UUID with the professor user's UID from Supabase Authentication -> Users.
-- Review existing policies first. Skip public_read_* statements if equivalent SELECT policies already exist.
grant usage on schema public to anon, authenticated;
alter table public.research_areas enable row level security;
alter table public.publications enable row level security;
alter table public.projects enable row level security;
alter table public.patents enable row level security;
alter table public.achievements enable row level security;
alter table public.profiles enable row level security;
create policy "professor_admin_manage_research_areas" on public.research_areas for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "professor_admin_manage_publications" on public.publications for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "professor_admin_manage_projects" on public.projects for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "professor_admin_manage_patents" on public.patents for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "professor_admin_manage_achievements" on public.achievements for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "professor_admin_manage_profiles" on public.profiles for all to authenticated using (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid) with check (auth.uid() = '2c0735e3-b32e-49cf-a594-b62bbfa1a28b'::uuid);
create policy "public_read_research_areas" on public.research_areas for select to anon, authenticated using (true);
create policy "public_read_publications" on public.publications for select to anon, authenticated using (true);
create policy "public_read_projects" on public.projects for select to anon, authenticated using (true);
create policy "public_read_patents" on public.patents for select to anon, authenticated using (true);
create policy "public_read_achievements" on public.achievements for select to anon, authenticated using (true);
create policy "public_read_profiles" on public.profiles for select to anon, authenticated using (true);
