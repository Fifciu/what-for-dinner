import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getUser } from "@/lib/supabase/get-user";

export const getMyHouseholds = cache(async () => {
  const user = await getUser();
    const supabase = await createClient();
    if (!user) {
      return {
        error: "No session found"
      }
    }
    const { data: foreignHouseholds, error: errForeignHouseholds } =
      await supabase
        .from("households")
        .select(
          `
      *,
      household_members!inner(*)
    `
        )
        .eq("household_members.user_id", user.id);
    if (errForeignHouseholds) {
      return {
        error: "Couldn't fetch member households",
      }
    }
  
    const { data: ownHouseholds, error: errOwnHouseholds } = await supabase
      .from("households")
      .select()
      .eq("owner_id", user.id);
    if (errOwnHouseholds) {
      return {
        error: "Couldn't fetch own household",
      }
    }
  
    const households = [...ownHouseholds, ...foreignHouseholds];

    return {
      households,
      myHousehold: ownHouseholds[0],
    }
})
