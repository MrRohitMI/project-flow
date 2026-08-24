"use client";
import { Plus } from "lucide-react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import { useState } from "react";
import TaskForm from "./task-form";
export default function TaskHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <section id="project-title" className="mb-4 px-3 pt-3">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <h4 className="text-lg font-medium text-gray-500">
            Manage your tasks.
          </h4>
        </section>
        <Button onClick={() => setOpen(true)}>
          <Plus size={18} /> Task
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} className="w-full max-w-2xl">
        <TaskForm/>
      </Modal>
    </>
  );
}
