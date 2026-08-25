"use client";
import { useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ProjectForm from "./project-form";
import { deleteProject } from "@/app/actions/project";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setErrorMessage, setSuccessMessage } from "@/store/slices/uiSlice";
type ProjectActionsProps = {
  projectId: string;
  project: {
    name: string;
    key: string;
    description: string;
    status: "active" | "completed" | "archived";
    startDate: string | null;
    endDate: string | null;
  };
};
export default function ProjectActions({
  projectId,
  project,
}: ProjectActionsProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      const result = await deleteProject(projectId);
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
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)} >
        <SquarePen size={18} />
      </Button>
      <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? <LoaderCircle size={18} /> : <Trash2 size={18} />}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl"
      >
        <ProjectForm
          project={{ id: projectId, ...project }}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
