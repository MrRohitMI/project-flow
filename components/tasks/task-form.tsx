import { useActionState, useEffect } from "react";
import Input from "../ui/form/input";
import Select from "../ui/form/select";
import Textarea from "../ui/form/textarea";
import { createTask, updateTask } from "@/app/actions/tasks";
import Button from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setSuccessMessage } from "@/store/slices/uiSlice";
import { OptionsTypes, priorityOptions, statusOptions } from "./tasks-options-constant";

type TaskFormProps = {
  projectOptions: OptionsTypes[];
  task?: {
    id: string;
    title: string;
    description: string;
    projectId: string;
    status: "todo" | "in_progress" | "in_review" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string | null;
  };
  onClose?: () => void;
};
export default function TaskForm({
  projectOptions,
  task,
  onClose,
}: TaskFormProps) {
  const action = task ? updateTask : createTask;
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      router.refresh();
      dispatch(setSuccessMessage(state.message));
      onClose?.();
    }
  }, [state.success, state.message, router, dispatch]);
  return (
    <form action={formAction}>
      {task && <input type="hidden" name="taskId" value={task.id} />}
      <Input
        name="title"
        label="Title"
        placeholder="Enter Title"
        error={state.errors?.title}
        defaultValue={task?.title}
      />
      <Textarea
        name="description"
        label="Description"
        placeholder="Enter Description"
        error={state.errors?.description}
        defaultValue={task?.description}
      />
      <Select
        name="projectId"
        label="Project"
        placeholder="Select Project"
        options={projectOptions}
        error={state.errors?.projectId}
        defaultValue={task?.projectId}
      />
      <Select
        name="status"
        label="Status"
        placeholder="Select Status"
        options={statusOptions}
        error={state.errors?.status}
        defaultValue={task?.status}
      />
      <Select
        name="priority"
        label="Priority"
        placeholder="Select Priority"
        options={priorityOptions}
        error={state.errors?.priority}
        defaultValue={task?.priority}
      />
      <Input
        type="date"
        name="dueDate"
        label="Due date"
        placeholder="Enter Due date"
        defaultValue={task?.dueDate?.slice(0, 10)}
      />
      {state.message && (
        <p
          className={`text-sm ${!state.errors ? "text-green-600" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-4">
        <Button disabled={isPending}>
          {isPending ? "Submitting" : "Submit"}
        </Button>
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
