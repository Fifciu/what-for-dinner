"use client";
import { useHouseholds } from "@/hooks/useHouseholds";
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
import { HouseholdAddSubmitBtn } from "./household-add-submit-btn";
import { useActionState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AddHousehold() {
  // const { addHousehold, isAdding, error } = useHouseholds();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
    },
  });
  const [state, formAction] = useActionState(addHousehold, { error: "" });

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   await addHousehold(values);
  //   if (error) {
  //     alert(error?.message || error);
  //   }
  //   return;
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
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
            <HouseholdAddSubmitBtn />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
