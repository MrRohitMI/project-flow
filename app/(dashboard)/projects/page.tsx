"use client";
import ProjectForm from "@/components/project-form";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import SectionCard from "@/components/ui/section-card";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
      tasks: 12,
    },
    {
      id: 2,
      name: "E-commerce Platform ",
      status: "Completed",
      tasks: 8,
    },
    {
      id: 3,
      name: "Mobile Application",
      status: "Planning",
      tasks: 20,
    },
  ];
  return (
    <>
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
      <SectionCard id="projects">
        <table className="app-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.tasks}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}
