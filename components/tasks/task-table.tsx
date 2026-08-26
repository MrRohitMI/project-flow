import { getTasks } from "@/app/actions/tasks";
import SectionCard from "../ui/section-card";
import TaskActions from "./task-actions";
type OptionProps = {
  label: string;
  value: string;
};
type TaskTableProps = {
  projectOptions: OptionProps[];
  search?: string;
  status?: string;
  priority?: string;
  project?: string;
};
export default async function TaskTable({
  projectOptions,
  search,
  status,
  priority,
  project
}: TaskTableProps) {
  const tasks = await getTasks(search, status, priority,project);
  return (
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
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id.toString()}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.projectId.name}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <TaskActions
                    taskId={task._id.toString()}
                    projectOptions={projectOptions}
                    task={{
                      title: task.title,
                      description: task.description,
                      projectId: task.projectId._id.toString(),
                      status: task.status,
                      priority: task.priority,
                      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </SectionCard>
  );
}
