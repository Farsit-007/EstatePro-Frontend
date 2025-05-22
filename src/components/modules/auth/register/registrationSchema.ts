import { z } from "zod";
export const registrationSchema = z.object({
    name : z.string({required_error:"Name is required"}).min(2).max(50),
    email : z.string({required_error:"Email is required"}).email("Invalid email"),
    password : z.string({required_error : "Password is required"}).min(5,"Must be at least 8 character"),
    phone : z.string({required_error:"Phone is required"}).min(11).max(11),
    city : z.string({required_error:"City is required"}),
    address : z.string({required_error:"Address is required"}),
    role : z.string({required_error:"Member type is required"}),
})