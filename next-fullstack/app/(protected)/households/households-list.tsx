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
  const { data: households, error } = await supabase.from('households').select()
  if (error) {
    return (
      <div>error try again later</div>
    )
  }

  const sortedHouseholds = households?.toSorted((a, b) => {
    if (a.owner_id === user.id) {
      return -1;
    }
    if (b.owner_id === user.id) {
      return 1;
    }
    return 0;
  })

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
            {sortedHouseholds?.map((household) => (
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