import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
})
