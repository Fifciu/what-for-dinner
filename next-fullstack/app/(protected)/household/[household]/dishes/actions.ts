"use server"
import { revalidatePath } from "next/cache";
import { formSchema } from "./dish-add.schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/get-user";
import { slugify } from "@/lib/utils";
import { DISH_PHOTOS_STORAGE } from "@/const";

interface DefaultActionState {
  error?: string;
}

export async function addDish(_prevState: DefaultActionState, formData: FormData) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  const householdId = formData.get('householdId');
  const result = formSchema.safeParse({
    name: formData.get("name"),
    photo_file: formData.get("photo_file"),
  });
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  const { name, photo_file } = result.data;
  if (!photo_file.type.startsWith('image/')) {
    return {
      error: 'Incorrect type of file'
    }
  }
  try {
    const fileExt = photo_file.name.split('.').pop();
    const fileName = `${slugify(name)}.${fileExt}`;
    const filePath = `dishes/user-${user.id}/${fileName}`;
    const supabase = await createClient();
    const fileBuffer = Buffer.from(await photo_file.arrayBuffer())
    const { error: uploadError } = await supabase.storage.from(DISH_PHOTOS_STORAGE).upload(filePath, fileBuffer, {
      contentType: photo_file.type,
    });
    if (uploadError) {
      return { error: `Failed to upload image: ${uploadError.message}` };
    }
    const { error: insertError } = await supabase.from('dishes').insert({
      name,
      photo_url: filePath
    });
    if (insertError) {
      const { error: removeError } = await supabase.storage.from(DISH_PHOTOS_STORAGE).remove([filePath]);
      if (removeError) {
        console.log(removeError, 'addDish action, failed trying to remove photo of dish')
      }
      if (insertError.code === '23505') {
        return {
          error: 'You already added a dish with this name'
        }
      }
      return {
        error: `Failed to insert record to the db: ${insertError}`
      }
    }
  } catch (error) {
    console.log(error, 'addDish action')
    return { error: 'Failed to add a dish' }
  }
  revalidatePath(`/household/${householdId}/dishes`);
  redirect(`/household/${householdId}/dishes`);
}

export async function deleteDish(_prevState: DefaultActionState, formData: FormData) {
  const dishId = formData.get('dishId');
  const householdId = formData.get('householdId');
  if (!dishId || !householdId) {
    return {
      error: 'Data not provided'
    }
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc('remove_dish_with_photo', { p_dish_id: Number(dishId) });
    if (error) {
      console.log(error)
      return {
        error: "Couldn't delete a dish"
      }
    }
    revalidatePath(`/household/${householdId}/dishes`);
    redirect(`/household/${householdId}/dishes`);
  } catch (error) {
    console.log(error, 'deleteDish action')
    return { error: 'Failed to delete a dish' }
  }
}