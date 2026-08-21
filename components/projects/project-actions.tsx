"use client";
import { useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ProjectForm from "./project-form";
import { deleteProject } from "@/app/actions/project";
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
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if(!confirmed) {
      return;
    }
    const result = await deleteProject(projectId)
    console.log(result)
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl"
      >
        <ProjectForm project={{ id: projectId, ...project }} />
      </Modal>
    </div>
  );
}
