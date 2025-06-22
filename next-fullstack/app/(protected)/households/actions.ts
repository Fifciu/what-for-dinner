"use server";
import { formSchema } from "./household-add.schema";
import { getUser } from "@/lib/supabase/get-user";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface DefaultActionState {
  error?: string;
}

export async function addHousehold(
  _prevState: DefaultActionState,
  formData: FormData
) {
  const name = (formData.get("name") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const result = formSchema.safeParse({
    name,
    city,
  });
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("households").insert({
    ...result.data,
    owner_id: user.id,
  });

  if (error) {
    console.error(error);
    if (error.code === "42501") {
      if (error.message.includes("Limit 1")) {
        return {
          error: "You can have only one household",
        };
      }
    }
    throw new Error("Couldn't add new household");
  }

  revalidatePath("/households");
  redirect("/households");
}

const buildChangeInvitationStatus = (
  newStatus: "accepted" | "rejected"
) =>
  async function (_prevState: DefaultActionState, formData: FormData) {
    const householdId = formData.get('householdId') as string;
    if (!householdId) {
      return {
        error: 'Incorrect household'
      }
    }
    const user = await getUser();
    if (!user) {
      redirect("/auth/login");
    }
    const supabase = await createClient();
    const { error } = await supabase
      .from("household_members")
      .update({
        status: newStatus,
      })
      .eq("user_id", user.id)
      .eq("household_id", householdId);

    if (error) {
      console.error(error);
      return {
        error: "Couldn't change status of invitation",
      };
    }

    revalidatePath("/households");
    redirect("/households");
  };

  export const acceptInvitation = buildChangeInvitationStatus("accepted");
  export const rejectInvitation = buildChangeInvitationStatus("rejected");
