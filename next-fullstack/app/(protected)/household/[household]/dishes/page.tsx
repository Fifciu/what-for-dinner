import { DishesList } from "./dishes-list";
import { DishAdd } from "./dish-add";
import { getMyDishes } from "@/lib/supabase/get-my-dishes";

export default async function MyDishes({
  params
}: {
  params: Promise<{ household: string }>
}) {
  const { household: householdId } = await params;
  const { dishes, error } = await getMyDishes();
  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-12 items-start w-full">
        <div className="w-full flex flex-col items-start gap-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-2xl">Dishes</h2>
            <DishAdd householdId={Number(householdId)} />
          </div>
          <DishesList dishes={dishes || []} householdId={Number(householdId)} />
        </div>
      </div>
    </div>
  )
}