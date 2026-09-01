"use server";

import {
  comparePassword,
  generateToken,
  hashPassword,
} from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import { loginSchema, userSchema } from "@/schemas/user.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ErrorObject = { name?: string; email?: string; password?: string };
type UserValues = {
  name?: string;
  email: string;
  password: string;
};

export type UserActionState = {
  success: boolean;
  message: string;
  errors?: ErrorObject;
  values?: UserValues;
};
export async function registerUser(
  _prevState: UserActionState,
  formData: FormData,
) {
  const data = {
    name: formData.get("name")?.toString().trim(),
    email: formData.get("email")?.toString().trim().toLowerCase(),
    password: formData.get("password")?.toString(),
  };

  const result = userSchema.safeParse(data);
  if (!result.success) {
    const errors: ErrorObject = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field as keyof ErrorObject] = issue.message;
      }
    });
    return {
      success: false,
      message: "Please fix the errors.",
      errors,
      values: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: "",
      },
    };
  }
  await dbConnect();
  const { name, email, password } = result.data;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return {
      success: false,
      message: "User email already exists!",
      values: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: "",
      },
    };
  }
  const hashedPassword = await hashPassword(password);
  await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  return {
    success: true,
    message: "Registration successful",
  };
}

export async function loginUser(
  _prevState: UserActionState,
  formData: FormData,
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors: ErrorObject = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      errors[field as keyof ErrorObject] = issue.message;
    });
    return {
      success: false,
      message: "Please fix errors",
      errors,
      values: {
        email: String(formData.get("email") || ""),
        password: "",
      },
    };
  }
  await dbConnect();
  const { email, password } = result.data;

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
      values: {
        email: String(formData.get("email") || ""),
        password: "",
      },
    };
  }
  const passwordMatch: boolean = await comparePassword(password, user.password);
  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid email or password",
      values: {
        email: String(formData.get("email") || ""),
        password: "",
      },
    };
  }
  const token = await generateToken(user._id.toString(), user.name ,user.email);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/dashboard");
}
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}
