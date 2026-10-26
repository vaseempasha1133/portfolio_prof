// Browser code must use only the publishable/anon key, never a service_role/secret key.
const SUPABASE_URL = "https://atindvbxlipatvevfraq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vh3f0bkWSXE72m3FyPpiZg_iyWkwwx4";
if (!window.supabase) console.error("Supabase JS did not load. Check the CDN script.");
else {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  const supabaseClient = window.supabaseClient;
  console.log("Supabase client initialized");
}
