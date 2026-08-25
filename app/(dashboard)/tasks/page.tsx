import TaskHeader from "@/components/tasks/task-header";
import { getProjects } from "@/app/actions/project";
import TaskTable from "@/components/tasks/task-table";
export default async function TasksPage() {
  const projects = await getProjects();
  const projectOptions = projects.map((project) => {
    return {
      label: `${project.name} - ${project.key}`,
      value: project._id.toString(),
    };
  });
  
  return (
    <>
      <TaskHeader projectOptions={projectOptions} />
      <TaskTable projectOptions={projectOptions} />
    </>
  );
}
