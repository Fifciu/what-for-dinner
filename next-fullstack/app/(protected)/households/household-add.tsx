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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./household-add.schema";
import { addHousehold } from "./actions";
import React, { useActionState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { FormSubmitBtn } from "@/components/form-submit-btn";

type AddHouseholdProps = {
  hasOwnHousehold: boolean
}

export function AddHousehold({ hasOwnHousehold }: AddHouseholdProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
    },
  });
  const [state, formAction] = useActionState(addHousehold, { error: "" });

  function AddHouseholdButton({...props}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
      if (hasOwnHousehold) {
        return <Tooltip>
          <TooltipTrigger className="cursor-not-allowed" {...props} disabled={true}>
            Create
          </TooltipTrigger>
          <TooltipContent>
            <p>One household per user</p>
          </TooltipContent>
        </Tooltip>;
      }
      return <Button {...props}>Create</Button>
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddHouseholdButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create household</DialogTitle>
          <DialogDescription>
            Household is a place where you live with other people and want vote
            together for dinner selection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-8 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Family house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Warsaw" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state.error && (
              <div className="grid w-full max-w-xl items-start gap-4">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to add new household</AlertTitle>
                <AlertDescription>
                  {state.error}
                </AlertDescription>
              </Alert>
              </div>
            )}
            <FormSubmitBtn pendingLabel="Adding..." idleLabel="Submit" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
