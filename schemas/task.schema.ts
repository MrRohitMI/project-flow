import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(3, { error: "Title must be min 3 characters " }),
  description: z
    .string()
    .trim()
    .min(1, { error: "Description must be at least 1 character" })
    .max(255, { error: "Description cannot exceed 255 characters" })
    .optional(),
  status: z.enum(["todo", "in-progress", "in-review", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  projectId: z
    .string({ error: "Project is required" })
    .nonempty({ error: "Project is required" }),
  dueDate: z.string().optional(),
});
