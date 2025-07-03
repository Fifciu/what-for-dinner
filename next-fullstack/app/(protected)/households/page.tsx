import { HouseholdsList } from "./households-list";
import { AddHousehold } from "./household-add";
import { HouseholdsListInvitations } from "./households-list-invitations";
import { getUser } from "@/lib/supabase/get-user";
import { getMyHouseholds } from "@/lib/supabase/get-my-households";

export default async function HouseholdsPage() {
  const user = await getUser();
  if (!user) {
    return;
  }
  const { error, households, myHousehold } = await getMyHouseholds();
  if (error) {
    return <div>{error}</div>
  }

  const hasOwnHousehold = Boolean(myHousehold);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-12 items-start w-full">
        <div className="w-full flex flex-col items-start gap-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-2xl">Households</h2>
            <AddHousehold hasOwnHousehold={hasOwnHousehold}/>
          </div>
          <HouseholdsList households={households || []} />
        </div>
        <HouseholdsListInvitations />
      </div>
    </div>
  );
}
