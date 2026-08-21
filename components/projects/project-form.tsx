"use client";
import { createProject, updateProject } from "@/app/actions/project";
import Button from "../ui/button";
import { useActionState, useEffect } from "react";
import Input from "../ui/form/input";
import Textarea from "../ui/form/textarea";
import Select from "../ui/form/select";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setSuccessMessage } from "@/store/slices/uiSlice";

type ProjectFormProps = {
  project?: {
    id: string;
    name: string;
    key: string;
    description: string;
    status: "active" | "completed" | "archived";
    startDate: string | null;
    endDate: string | null;
  };
  onSuccess?: () => void;
};
export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const action = project ? updateProject : createProject;
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Archived", value: "archived" },
  ];
  useEffect(() => {
    if (state.success) {
      router.refresh();
      dispatch(setSuccessMessage(state.message));
      onSuccess?.();
    }
  }, [state.success, state.message, router, dispatch]);
  return (
    <form action={formAction}>
      {project && <input type="hidden" name="projectId" value={project.id} />}
      <Input
        type="text"
        label="Project Name"
        name="name"
        placeholder="Enter Project Name"
        error={state.errors?.name}
        defaultValue={state.values?.name ?? project?.name}
      />

      <Input
        type="text"
        label="Project Key"
        name="key"
        placeholder="Enter Project Key"
        error={state.errors?.key}
        defaultValue={state.values?.key ?? project?.key}
      />

      <Textarea
        label="Project Description"
        error={state.errors?.description}
        name="description"
        placeholder="Enter Description"
        defaultValue={state.values?.description ?? project?.description}
      />

      <Select
        label="Status"
        name="status"
        error={state.errors?.status}
        placeholder="Select Status"
        options={statusOptions}
        defaultValue={state.values?.status ?? project?.status}
      />

      <Input
        label="Start Date"
        name="startDate"
        type="date"
        error={state.errors?.startDate}
        defaultValue={
          state.values?.startDate?.slice(0, 10) ??
          project?.startDate?.slice(0, 10)
        }
      />

      <Input
        label="End Date"
        name="endDate"
        type="date"
        error={state.errors?.endDate}
        defaultValue={
          state.values?.endDate?.slice(0, 10) ?? project?.endDate?.slice(0, 10)
        }
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
