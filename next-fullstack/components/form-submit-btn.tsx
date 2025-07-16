"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitBtnProps {
  pendingLabel: string;
  idleLabel: string;
}

export function FormSubmitBtn({ pendingLabel, idleLabel, ...props }: FormSubmitBtnProps & React.ComponentProps<'button'>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
} 