import SectionCard from "@/components/section-card";
import StatCard from "@/components/stat-card";
import StatusBadge from "@/components/status-badge";
import {
  Check,
  Folder,
  ListChecks,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";

export default function Dashboard() {
  type Card = {
    label: string;
    count: number;
    icon: LucideIcon;
  };
  const cards: Card[] = [
    {
      label: "Projects",
      count: 12,
      icon: Folder,
    },
    {
      label: "Tasks",
      count: 48,
      icon: ListChecks,
    },
    {
      label: "In Progress",
      count: 15,
      icon: LoaderCircle,
    },
    {
      label: "Completed",
      count: 33,
      icon: Check,
    },
  ];
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
    },
    {
      id: 2,
      name: "E-commerce Platform ",
      status: "Completed",
    },
    {
      id: 3,
      name: "Mobile Application",
      status: "Planning",
    },
  ];
  type Status = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
  type Task = {
    id: number;
    name: string;
    projectName: string;
    status: Status;
  };
  const tasks: Task[] = [
    {
      id: 1,
      name: "Create login page",
      projectName: "Website",
      status: "TODO",
    },
    {
      id: 2,
      name: "Build dashboard",
      projectName: "CRM",
      status: "IN_PROGRESS",
    },
    {
      id: 3,
      name: "Fix responsive issue",
      projectName: "Mobile App",
      status: "IN_REVIEW",
    },
    {
      id: 4,
      name: "Deploy Application",
      projectName: "Website",
      status: "DONE",
    },
  ];
  return (
    <div>
      <section id="title" className="mb-4 px-3 pt-3">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <h4 className="text-lg font-medium text-gray-500">
          Welcome back! Here's an overview of your workspace.
        </h4>
      </section>
      <section
        id="dashboard-cards"
        className="grid grid-cols-1 p-3 gap-2 md:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card) => (
          <StatCard key={card.label} card={card} />
        ))}
      </section>
      <SectionCard id="project-stats" title="Recent Projects">
        <table className="app-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
      <SectionCard id="tasks" title="Recent Tasks">
        <table className="app-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.projectName}</td>
                <td>
                  <StatusBadge status={task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
