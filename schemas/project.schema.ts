import { z } from "zod";

export const projectSchema = z
  .object({
    name: z
      .string({ error: "Project Name is Required." })
      .trim()
      .min(2, { error: "Project Name must be at least 2 characters." }),

    key: z
      .string({ error: "Project Key is Required." })
      .trim()
      .min(1, { error: "Project Key must be at least 1 character." })
      .max(10,{ error: "Project Key must be at most 10 character." }),

    description: z
      .string({ error: "Project Description is required." })
      .trim()
      .min(2, {
        error: "Project Description must be at least 2 characters.",
      }),

    status: z.enum(["active", "completed", "archived"]),

    startDate: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.date().optional(),
    ),

    endDate: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.date().optional(),
    ),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }
      return data.startDate <= data.endDate;
    },
    {
      message: "Start date cannot be after end date.",
      path: ["endDate"],
    },
  );
