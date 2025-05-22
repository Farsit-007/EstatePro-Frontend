import { z } from "zod";
export const approvalSchema = z.object({
    landlordPhone : z.string({required_error:"Phone is required"}).min(11).max(11),
})