import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/get-user";
import { Invitation } from "./households-invitation";

export async function HouseholdsListInvitations() {
  const user = await getUser();
  const supabase = await createClient();
  if (!user) {
    return;
  }
  const { data: invitedToHouseholds, error } = await supabase
    .from("households")
    .select(
      `
    *,
    household_members!inner(*)
  `
    )
    .eq("household_members.status", "invited")
    .eq("household_members.user_id", user.id);
  if (error) {
    return <div>error try again later</div>;
  }

  if(!invitedToHouseholds.length) {
    return (
      <div className="w-full">
        <h2 className="font-bold text-2xl mb-4">Invitations</h2>
        <p className="text-muted-foreground">
          You have no invitations.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl mb-4">Invitations</h2>
      {invitedToHouseholds?.map((household) => (
        <Invitation key={household.id} household={household} />
      ))}
    </div>
  );
}
