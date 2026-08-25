import { useActionState, useEffect } from "react";
import Input from "../ui/form/input";
import Select from "../ui/form/select";
import Textarea from "../ui/form/textarea";
import { createTask, updateTask } from "@/app/actions/tasks";
import Button from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setSuccessMessage } from "@/store/slices/uiSlice";
type OptionsTypes = {
  label: string;
  value: string;
};

const statusOptions: OptionsTypes[] = [
  { label: "TODO", value: "todo" },
  { label: "IN_PROGRESS", value: "in_progress" },
  { label: "IN_REVIEW", value: "in_review" },
  { label: "DONE", value: "done" },
];
const priorityOptions: OptionsTypes[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
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
  onSuccess?: () => void;
};
export default function TaskForm({
  projectOptions,
  task,
  onSuccess,
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
      onSuccess?.();
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
      <Button>{isPending ? "...Submitting" : "Submit"}</Button>
      <Button variant="secondary">Cancel</Button>
    </form>
  );
}
