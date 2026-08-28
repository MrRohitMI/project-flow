import TaskHeader from "@/components/tasks/task-header";
import { getProjects } from "@/app/actions/project";
import TaskTable from "@/components/tasks/task-table";
export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
    project?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const priority = params.priority;
  const project = params.project;
  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  const {projects} = await getProjects();
  const projectOptions = projects.map((project) => {
    return {
      label: `${project.name} - ${project.key}`,
      value: project._id.toString(),
    };
  });

  return (
    <>
      <TaskHeader projectOptions={projectOptions} />
      <TaskTable
        projectOptions={projectOptions}
        search={search}
        status={status}
        priority={priority}
        project={project}
        page={page}
        limit={limit}
      />
    </>
  );
}
