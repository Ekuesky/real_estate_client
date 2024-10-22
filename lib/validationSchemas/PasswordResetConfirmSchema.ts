import * as z from 'zod'


export const PasswordResetConfirmSchema = z.object({

	"uid": z.string().uuid(),
  "token": z.string().trim(),
  "new_password": z.string().min(8, {message: "Password must be at least 8 characters long"}),
  "re_new_password": z.string().min(8, {message:"Please enter your new password"})
}).refine(
	({ new_password, re_new_password }) => new_password === re_new_password,
  { message: "Passwords do not match" ,path: ["re_new_password"] }
)

export type TPasswordResetConfirmSchema = z.infer<typeof PasswordResetConfirmSchema>