import { z } from "zod";


export const userSchema = z.object({
    username: z.string().min(6,'username must be 6 character long'),
    email:z.string().email('Invalid email address'),
    password:z.string().min(6,'password must be 6 character long')
})

