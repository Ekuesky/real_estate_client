import * as z from 'zod'


export const PasswordResetRequestSchema = z.object({
	email: z.string().trim().email({message : "Please provide a valid email address"})
		.toLowerCase(),
})

export type TPasswordResetRequestSchema	 = z.infer<typeof PasswordResetRequestSchema>