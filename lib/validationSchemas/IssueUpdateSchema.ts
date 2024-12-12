import * as z from "zod"

export const IssueUpdateSchema = z.object({
  status: z.enum(["reported", "resolved","in_progress"]),
});

export type TIssueUpdateSchema = z.infer<typeof issueUpdateSchema>