import { z } from "zod";

export const formSchema = z.object({
  requirement: z.string().min(10, "Requirement must be at least 10 characters"),
  moveInDate: z.date({
    required_error: "Move-in date is required",
  }),
  rentalDuration: z.string({
    required_error: "Rental duration is required",
  }),
});