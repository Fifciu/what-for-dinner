import { Database } from "@/database.types";
import { createBrowserClient } from "@supabase/ssr";

let supabase: ReturnType<typeof createBrowserClient>;

export function createClient() {
  if (!supabase) {
    supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return supabase;   
}
