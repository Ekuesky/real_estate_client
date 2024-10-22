import * as z from 'zod'

export const LoginUserSchema = z.object(
	{
    email: z.string().trim().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, {message : "Password must be at least 8 characters long"}),
  },

)

// Création d'un type TypeScript à partir du schéma Zod
export type TLoginUserSchema = z.infer<typeof LoginUserSchema>
// z.infer permet d'inférer automatiquement le type TypeScript correspondant au schéma