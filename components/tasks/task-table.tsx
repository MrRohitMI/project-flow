import { getTasks } from "@/app/actions/tasks";
import SectionCard from "../ui/section-card";
import TaskActions from "./task-actions";
type OptionProps = {
  label: string;
  value: string;
};
export default async function TaskTable({
  projectOptions,
}: {
  projectOptions: OptionProps[];
}) {
  const tasks = await getTasks();
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
          {tasks.map((task) => (
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
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
