import * as z from "zod"

export const IssueCreateSchema = z.object({
	title: z.string().min(1, "An issue must have a title"),
  description: z.string().min(1, "An issue must have a description").max(500),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["reported", "resolved","in_progress"]),
});

export type TIssueCreateSchema = z.infer<typeof issueCreateSchema>