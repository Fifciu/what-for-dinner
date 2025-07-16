"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDish } from "./actions";
import React, { useActionState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormSubmitBtn } from "@/components/form-submit-btn";

type DishDeleteProps = {
  householdId: number;
  dishId: number;
  dishName: string;
};

export function DishDelete({ householdId, dishId, dishName }: DishDeleteProps) {
  const [state, formAction] = useActionState(deleteDish, { error: "" });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 size="8" strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Removing dish</DialogTitle>
          <DialogDescription>
            Are you sure that you want to remove <b>{dishName}</b> dish?
          </DialogDescription>
        </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="householdId" value={householdId} />
            <input type="hidden" name="dishId" value={dishId} />

            {state.error && (
              <div className="grid w-full max-w-xl items-start gap-4">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to remove the dish</AlertTitle>
                <AlertDescription>
                  {state.error}
                </AlertDescription>
              </Alert>
              </div>
            )}
            <div className="flex gap-2 w-full mt-2">
              <DialogClose className="flex-1 inline-flex justify-center items-center">Cancel</DialogClose>
              <FormSubmitBtn className="flex-1" idleLabel="Submit" pendingLabel="Removing..."/>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  )
}
