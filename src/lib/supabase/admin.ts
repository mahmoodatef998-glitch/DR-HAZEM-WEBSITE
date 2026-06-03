import { createClient } from "@supabase/supabase-js";

/**
 * Admin client that bypasses RLS — only for server-side admin operations.
 * Never expose the service_role key to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
