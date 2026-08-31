"use client";
import { registerUser } from "@/app/actions/auth";
import Input from "../ui/form/input";
import { useActionState } from "react";
import Button from "../ui/button";

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
      />
      <Input
        label="Email"
        name="email"
        placeholder="Enter Your Email"
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
        {isPending ? "Creating Account..." : "Register"}
      </Button>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
