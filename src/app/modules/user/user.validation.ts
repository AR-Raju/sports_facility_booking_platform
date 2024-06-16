import { z } from "zod";
import { userRole } from "./user.constant";
const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter valid email"),
    password: z
      .string({
        invalid_type_error: "Password is needed while creating account",
      })
      .max(20, { message: "Password can not be more than 20 chracters" })
      .optional(),
    name: z.string(),
    phone: z.string(),
    role: z.enum([...userRole] as [string, ...string[]], {
      message: "Invalid gender",
    }),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
