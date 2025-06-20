import { z } from "zod";
export const passwordChangeSchema = z.object({
  newPassword: z.string({ required_error: "password is required" }),
  confirmPassword: z.string({ required_error: "password is required" }),
});
