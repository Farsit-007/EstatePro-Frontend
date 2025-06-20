import { z } from "zod";
export const resetPasswordChangeSchema = z.object({
    email : z.string({required_error : "Email is required"}).email()
})