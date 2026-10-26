PROFESSOR PORTFOLIO ADMIN SETUP

1. Copy admin.html, dashboard.html, supabase.js, script.js, style.css, and professor-photo.jpg beside index.html.
2. In Supabase Authentication -> Users, copy the professor account's User UID.
3. Replace every YOUR_ADMIN_USER_UUID in supabase-admin-policies.sql with that UID.
4. Review existing RLS policies before running SQL. Skip public_read_* CREATE POLICY statements if equivalent SELECT policies already exist.
5. Dashboard uses a JSON record editor because the database column definitions were not supplied. Use exact column names for each table.
6. Never put a service_role/secret key in browser code. Contact messages are intentionally not included in this dashboard.
