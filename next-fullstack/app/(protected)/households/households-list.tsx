import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Household } from './types';
import { getUser } from "@/lib/supabase/get-user";

export async function HouseholdsList({ households }: { households: Household[] }) {
  const user = await getUser();

  return (
      <div className="flex flex-col gap-4">
        {households?.map((household) => (
          <Link href={`/household/${household.id}`} key={household.name + household.city}>
          <Card
            className="@container/card"
          >
            <CardHeader>
              <CardDescription>{household.city}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {household.name}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {household.owner_id === user?.id ? "Owner" : "Guest"}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Voting not started
              </div>
              <div className="text-muted-foreground">
                Pick up dishes and initiate voting as you are an owner
              </div>
            </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
  );
}
