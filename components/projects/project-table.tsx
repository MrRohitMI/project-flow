import { getProjects } from "@/app/actions/project";
import SectionCard from "../ui/section-card";
import ProjectActions from "./project-actions";
import Pagination from "../ui/pagination";
type ProjectTableProps = {
  search?: string;
  status?: string;
  page: number;
  limit: number;
};
export default async function ProjectTable({
  search,
  status,
  page,
  limit,
}: ProjectTableProps) {
  const { projects, total } = await getProjects(search, status, page, limit);

  const totalPages = Math.ceil(total / limit);
  return (
    <SectionCard id="projects">
      <table className="app-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Key</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No projects found
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project._id.toString()}>
                <td>{project.name}</td>
                <td>{project.key}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>
                  <ProjectActions
                    projectId={project._id.toString()}
                    project={{
                      name: project.name,
                      key: project.key,
                      description: project.description,
                      status: project.status,
                      startDate: project.startDate
                        ? project.startDate.toISOString()
                        : null,
                      endDate: project.endDate
                        ? project.endDate.toISOString()
                        : null,
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} pageName="projects" />}
    </SectionCard>
  );
}
