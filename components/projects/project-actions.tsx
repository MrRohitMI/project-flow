"use client";
import { useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ProjectForm from "./project-form";
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

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl"
      >
        <ProjectForm project={{ id: projectId, ...project }} />
      </Modal>
    </>
  );
}
