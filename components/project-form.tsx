"use client";
import { createProject } from "@/app/actions/project";
import Button from "./ui/button";
import { useActionState } from "react";
import Input from "./ui/form/input";
import Textarea from "./ui/form/textarea";
import Select from "./ui/form/select";

export default function ProjectForm() {
  const [state, formAction, isPending] = useActionState(createProject, {
    success: false,
    message: "",
  });
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Archived", value: "archived" },
  ];
  return (
    <form action={formAction}>
      <Input
        type="text"
        label="Project Name"
        name="name"
        placeholder="Enter Project Name"
        error={state.errors?.name}
      />

      <Input
        type="text"
        label="Project Key"
        name="key"
        placeholder="Enter Project Key"
        error={state.errors?.key}
      />

      <Textarea
        label="Project Description"
        error={state.errors?.description}
        name="description"
        placeholder="Enter Description"
      />

      <Select
        label="Status"
        name="status"
        error={state.errors?.status}
        placeholder="Select Status"
        options={statusOptions}
      />

      <Input
        label="Start Date"
        name="startDate"
        type="date"
        error={state.errors?.startDate}
      />

      <Input
        label="End Date"
        name="endDate"
        type="date"
        error={state.errors?.endDate}
      />

      <div className="flex justify-end gap-4 mt-4">
        <Button disabled={isPending}>
          {isPending ? "Submitting" : "Submit"}
        </Button>
        <Button variant="secondary" type="button">
          Cancel
        </Button>
      </div>
      {state.message && (
        <p
          className={`text-sm ${!state.errors ? "text-green-600" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
