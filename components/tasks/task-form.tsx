import { useActionState } from "react";
import Input from "../ui/form/input";
import Select from "../ui/form/select";
import Textarea from "../ui/form/textarea";
import createTask from "@/app/actions/tasks";
import Button from "../ui/button";
type OptionsTypes = {
  label: string;
  value: string;
};
type ProjectOptions = {
  label: string;
  value: number;
};
const statusOptions: OptionsTypes[] = [
  { label: "TODO", value: "todo" },
  { label: "IN_PROGRESS", value: "in_progress" },
  { label: "IN_REVIEW", value: "in_review" },
  { label: "DONE", value: "done" },
];
const projectOptions: ProjectOptions[] = [
  { label: "Project 1", value: 1 },
  { label: "Project 2", value: 2 },
  { label: "Project 3", value: 3 },
];
const priorityOptions: OptionsTypes[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
export default function TaskForm() {
  const [status, formAction, isPending] = useActionState(createTask, {
    success: false,
    message: "",
  });
  return (
    <form action={formAction}>
      <Input name="title" label="Title" placeholder="Enter Title" error={status.errors?.title}/>
      <Textarea
        name="description"
        label="Description"
        placeholder="Enter Description"
        error={status.errors?.description}
      />
      <Select
        name="projectId"
        label="Project"
        placeholder="Select Project"
        options={projectOptions}
        error={status.errors?.projectId}
      />
      <Select
        name="status"
        label="Status"
        placeholder="Select Status"
        options={statusOptions}
        error={status.errors?.status}
      />
      <Select
        name="priority"
        label="Priority"
        placeholder="Select Priority"
        options={priorityOptions}
        error={status.errors?.priority}
      />
      {status.success && <p>Success</p>}
      <Button>{isPending ? "...Submitting" : "Submit"}</Button>
      <Button variant="secondary">Cancel</Button>
    </form>
  );
}
