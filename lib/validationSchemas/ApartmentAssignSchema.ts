import * as z from "zod"
import { validate } from "uuid";

export const ApartmentAssignSchema = z.object({
	tenant:z.string().refine((s:string) =>validate(s), {
		message:"Invalid UUID"
	})
})

export type TApartmentAssignSchema = z.infer<typeof ApartmentAssignSchema>