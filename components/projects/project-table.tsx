import { getProjects } from "@/app/actions/project";
import SectionCard from "../ui/section-card";
import ProjectActions from "./project-actions";

export default async function ProjectTable() {
  const projects = await getProjects();

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
          {projects.map((project) => (
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
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
