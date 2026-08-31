import z from "zod";

export const userSchema = z.object({
  name: z
    .string({ error: "User Name is required" })
    .trim()
    .min(3, { error: "User Name must be minimum 3 characters" })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
      error: "User Name must contain only letters",
    }),
  email: z.email({ error: "Please enter a valid email" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be minimum 8 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      error: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

export const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" }),
});
