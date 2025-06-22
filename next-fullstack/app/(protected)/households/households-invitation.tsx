'use client'

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
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { acceptInvitation, buildChangeInvitationStatus, rejectInvitation } from "./actions";
import { useActionState } from "react";

export function Invitation({ household }: { household: any }) {
  const [stateAccInv, acceptInvitationAction, isPendingAccInv] = useActionState(
    acceptInvitation,
    { error: '' }
  );

  const [stateRejInv, rejectInvitationAction, isPendingRejInv] = useActionState(
    rejectInvitation,
    { error: '' }
  );

  const disableButtons = isPendingAccInv || isPendingRejInv;

  return (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>
        You have been invited to the household <b>{household.name}</b> at{" "}
        {household.city}
      </AlertTitle>
      <AlertDescription className="flex justify-between">
        Do you want to join?
        <form>
          <div className="flex gap-2">
            <input type="hidden" value={household.id} name="householdId" />
            <Button size="sm" disabled={disableButtons} formAction={acceptInvitationAction}>Accept</Button>
            <Button variant="secondary" size="sm" disabled={disableButtons} formAction={rejectInvitationAction}>
              Reject
            </Button>
          </div>
          {stateAccInv.error && <div>{stateAccInv.error}</div>}
          {stateRejInv.error && <div>{stateRejInv.error}</div>}
        </form>
      </AlertDescription>
    </Alert>
  );
}
