"use client";
import { useActionState } from "react";
import Input from "../ui/form/input";
import { loginUser, UserActionState } from "@/app/actions/auth";
import Button from "../ui/button";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    UserActionState,
    FormData
  >(loginUser, {
    success: false,
    message: "",
  });
  return (
    <>
      <form action={formAction}>
        <Input
          placeholder="Enter Your Email"
          label="Email"
          name="email"
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
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </div>

        {state.message && (
          <p className={state.success ? "text-green-600" : "text-red-600"}>
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}
