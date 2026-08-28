import { getTasks } from "@/app/actions/tasks";
import SectionCard from "../ui/section-card";
import TaskActions from "./task-actions";
import Pagination from "../ui/pagination";
import Badge from "../ui/badge";
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
  page: number;
  limit: number;
};
export default async function TaskTable({
  projectOptions,
  search,
  status,
  priority,
  project,
  page,
  limit,
}: TaskTableProps) {
  const { tasks, total } = await getTasks(
    search,
    status,
    priority,
    project,
    page,
    limit,
  );
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <SectionCard>
        <table className="app-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
              <th className="whitespace-nowrap w-1">Action</th>
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
                  <td>
                    <Badge status={task.status.toUpperCase()} />
                  </td>
                  <td>
                    <Badge status={task.priority.toUpperCase()} />
                  </td>
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
                        dueDate: task.dueDate
                          ? task.dueDate.toISOString()
                          : null,
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} pageName="tasks" />
        )}
      </SectionCard>
    </>
  );
}
