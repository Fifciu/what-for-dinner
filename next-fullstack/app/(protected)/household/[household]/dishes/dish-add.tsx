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
import { formSchema } from "./dish-add.schema";
import { addDish } from "./actions";
import React, { useActionState, useId, useState } from "react";
import { AlertCircleIcon, Upload, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FormSubmitBtn } from "@/components/form-submit-btn";

type DishAddProps = {
  householdId: number;
};

export function DishAdd({ householdId }: DishAddProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileUploadId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      photo_file: undefined
    },
  });
  const [state, formAction] = useActionState(addDish, { error: "" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("photo_file", file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    form.setValue("photo_file", undefined as unknown as File);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add dish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Dish</DialogTitle>
          <DialogDescription>
            Dish is a meal that you are able to cook, so when creating a vote, you can select this dish.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-8 flex flex-col">
            <input type="hidden" name="householdId" value={householdId} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dish name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="photo_file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          name="photo_file"
                          ref={field.ref}
                          id={fileUploadId}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => (document.getElementById(fileUploadId) as HTMLInputElement)?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Choose Image
                        </Button>
                        {imageFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={clearImage}
                            className="flex items-center gap-2"
                          >
                            <X className="h-4 w-4" />
                            Clear
                          </Button>
                        )}
                      </div>
                      
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-32 object-contain mx-auto rounded-md border"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {state.error && (
              <div className="grid w-full max-w-xl items-start gap-4">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to add new dish</AlertTitle>
                <AlertDescription>
                  {state.error}
                </AlertDescription>
              </Alert>
              </div>
            )}
            <FormSubmitBtn className="flex-1" idleLabel="Submit" pendingLabel="Adding..."/>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
