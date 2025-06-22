import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/lib/supabase/get-user";

export async function HouseholdsList() {
  const user = await getUser();
  const supabase = await createClient();
  if (!user) {
    return;
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
      .eq("household_members.status", "accepted")
      .eq("household_members.user_id", user.id);
  if (errForeignHouseholds) {
    return <div>error try again later</div>;
  }

  const { data: ownHouseholds, error: errOwnHouseholds } = await supabase
    .from("households")
    .select()
    .eq("owner_id", user.id);
  if (errOwnHouseholds) {
    return <div>error try again later</div>;
  }

  const households = [...ownHouseholds, ...foreignHouseholds];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="text-right">Is owner?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {households?.map((household) => (
            <TableRow key={household.id}>
              <TableCell className="font-medium">{household.name}</TableCell>
              <TableCell>{household.city}</TableCell>
              <TableCell>
                {household.owner_id === user?.id ? "YES" : "NO"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
