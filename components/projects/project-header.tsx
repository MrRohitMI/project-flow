"use client";
import { useState } from "react";
import Button from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "../ui/modal";
import ProjectForm from "./project-form";


export default function ProjectHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between px-2">
      <section id="project-title" className="mb-4 px-3 pt-3">
        <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
        <h4 className="text-lg font-medium text-gray-500">
          Manage your projects.
        </h4>
      </section>

      <Button onClick={() => setOpen(true)}>
        <Plus size={18} /> Project
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl"
      >
        <div>
          <ProjectForm />
        </div>
      </Modal>
    </div>
  );
}
