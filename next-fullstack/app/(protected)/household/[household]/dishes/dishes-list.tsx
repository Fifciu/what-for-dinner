import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";
import Image from "next/image";
import { DishDelete } from "./dish-delete";

const PLACEHOLDER = 'https://placehold.co/150x150';

export function DishesList({ dishes, householdId }: { dishes: Tables<'dishes'>[], householdId: number }) {
  if (!dishes.length) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No dishes have been added yet.</p>
        <p>Add your first dish to start building your collection!</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 mx-auto">
      {dishes.map((dish) => <DishCard key={dish.id} dish={dish} householdId={householdId} />)}
    </div>
  )
}

function DishCard({ dish, householdId }: { dish: Tables<'dishes'>, householdId: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full justify-between items-center">
            <span>{dish.name}</span>
            <div className="flex gap-2 ml-4">
              <DishDelete dishId={dish.id} dishName={dish.name} householdId={householdId} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Image src={dish.photo_url || PLACEHOLDER} alt={dish.name} width={150} height={150} />
      </CardContent>
    </Card>
  )
}