"use client";
import { useReducer, useState } from "react";
import Button from "../ui/button";
import TaskForm from "./task-form";
import Modal from "../ui/modal";
import { deleteTask } from "@/app/actions/tasks";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setErrorMessage, setSuccessMessage } from "@/store/slices/uiSlice";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
type OptionProps = {
  label: string;
  value: string;
};
type ActionProps = {
  taskId: string;
  projectOptions: OptionProps[];
  task: {
    title: string;
    description: string;
    projectId: string;
    status: "todo" | "in_progress" | "in_review" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string | null;
  };
};
export default function TaskActions({
  taskId,
  projectOptions,
  task,
}: ActionProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      const result = await deleteTask(taskId);
      if (result.success) {
        router.refresh();
        dispatch(setSuccessMessage(result.message));
      } else {
        dispatch(setErrorMessage(result.message));
      }
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>
          <SquarePen size={18} />
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? <LoaderCircle size={18} /> : <Trash2 size={18} />}
        </Button>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className="w-full max-w-2xl"
        >
          <TaskForm
            projectOptions={projectOptions}
            task={{ id: taskId, ...task }}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
