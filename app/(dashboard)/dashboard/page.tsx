import { getDashboardStats } from "@/app/actions/dashboard";
import SectionCard from "@/components/ui/section-card";
import StatCard from "@/components/ui/stat-card";
import {
  Check,
  Folder,
  ListChecks,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";
import Badge from "@/components/ui/badge";

export default async function Dashboard() {
  type Card = {
    label: string;
    count: number;
    icon: LucideIcon;
  };
  const {
    totalProjects,
    totalTasks,
    inProgressTasks,
    completedTasks,
    recentProjects,
    recentTasks,
  } = await getDashboardStats();
  const cards: Card[] = [
    {
      label: "Projects",
      count: totalProjects,
      icon: Folder,
    },
    {
      label: "Tasks",
      count: totalTasks,
      icon: ListChecks,
    },
    {
      label: "In Progress Tasks",
      count: inProgressTasks,
      icon: LoaderCircle,
    },
    {
      label: "Completed Tasks",
      count: completedTasks,
      icon: Check,
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
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr key={project._id.toString()}>
                  <td>{project.name}</td>
                  <td>
                    <Badge status={project.status.toUpperCase()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <SectionCard id="tasks" title="Recent Tasks">
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task._id.toString()}>
                  <td>{task.title}</td>
                  <td>{task.projectId.name}</td>
                  <td>
                    <Badge status={task.status.toUpperCase()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
