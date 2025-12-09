// lib/supabaseServer.js
export function getSupabaseRestConfig() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env var");
  }
  const restUrl = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;
  const headers = {
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
    apikey: SUPABASE_SERVICE_ROLE,
  };
  return { restUrl, headers };
}
