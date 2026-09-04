"use client";
import { registerUser } from "@/app/actions/auth";
import Input from "../ui/form/input";
import { useActionState } from "react";
import Button from "../ui/button";
import Link from "next/link";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    success: false,
    message: "",
  });
  return (
    <form action={formAction}>
      <Input
        label="Name"
        name="name"
        placeholder="Enter Your Name"
        error={state.errors?.name}
        defaultValue={state.values?.name}
        required
      />
      <Input
        label="Email"
        name="email"
        placeholder="Enter Your Email"
        type="email"
        error={state.errors?.email}
        defaultValue={state.values?.email}
        required
      />
      <Input
        label="Password"
        name="password"
        placeholder="Enter Your Password"
        type="password"
        error={state.errors?.password}
        required
      />
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href="/"
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Cancel
        </Link>

        <Button disabled={isPending}>
          {isPending ? "Creating Account..." : "Register"}
        </Button>
      </div>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
