'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient>();

  async function initSupabaseClient () {
    const supabase = await createClient();
    setSupabaseClient(supabase);
  }

  useEffect(() => {
    initSupabaseClient();
  }, []);

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {supabaseClient && children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase(){
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return ctx;
}