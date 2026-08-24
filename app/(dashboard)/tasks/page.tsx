import SectionCard from "@/components/ui/section-card";
import TaskHeader from "@/components/tasks/task-header";
export default function TasksPage() {
  const dummyTasks = [
    {
      id: "1",
      title: "Build Login Page",
      description: "Create the login UI and validation",
      project: "ProjectFlow",
      status: "todo",
      priority: "high",
      dueDate: "2026-09-05",
    },
    {
      id: "2",
      title: "Create Dashboard",
      description: "Build the main project dashboard",
      project: "ProjectFlow",
      status: "in_progress",
      priority: "high",
      dueDate: "2026-09-10",
    },
    {
      id: "3",
      title: "Setup API Integration",
      description: "Connect frontend with backend APIs",
      project: "Website Redesign",
      status: "in_review",
      priority: "medium",
      dueDate: "2026-09-08",
    },
    {
      id: "4",
      title: "Write Unit Tests",
      description: "Add tests for project components",
      project: "ProjectFlow",
      status: "done",
      priority: "medium",
      dueDate: "2026-08-28",
    },
    {
      id: "5",
      title: "Fix Navigation Bug",
      description: "Fix mobile navigation issue",
      project: "Mobile Application",
      status: "todo",
      priority: "low",
      dueDate: "2026-09-15",
    },
    {
      id: "6",
      title: "Database Design",
      description: "Finalize MongoDB collection structure",
      project: "ProjectFlow",
      status: "in_progress",
      priority: "high",
      dueDate: "2026-09-03",
    },
  ];
  return (
    <>
      <TaskHeader />
      <SectionCard>
        <table className="app-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.project}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}
