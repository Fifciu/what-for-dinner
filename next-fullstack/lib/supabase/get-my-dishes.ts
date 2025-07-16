import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getUser } from "@/lib/supabase/get-user";
import { DISH_PHOTOS_STORAGE } from '@/const';

export const getMyDishes = cache(async () => {
  const user = await getUser();
    const supabase = await createClient();
    if (!user) {
      return {
        error: "No session found"
      }
    }
    const { data: dishes, error } = await supabase.from('dishes').select().eq("user_id", user.id).order('created_at', { ascending: false });
    if (error) {
      return {
        error: "Couldn't fetch own dishes",
      }
    }

    return {
      dishes: dishes.map((dish) => {
        return ({
          ...dish,
          photo_url: supabase.storage.from(DISH_PHOTOS_STORAGE).getPublicUrl(dish.photo_url).data.publicUrl
        })
      })
    }
})
