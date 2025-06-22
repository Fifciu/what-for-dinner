import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
});
