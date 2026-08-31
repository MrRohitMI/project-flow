"use client";
import { useActionState } from "react";
import Input from "../ui/form/input";
import { loginUser } from "@/app/actions/auth";
import Button from "../ui/button";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, {
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
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter Your Password"
          type="password"
          error={state.errors?.password}
        />
        <Button disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>

        {state.message && (
          <p className={state.success ? "text-green-600" : "text-red-600"}>
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}
