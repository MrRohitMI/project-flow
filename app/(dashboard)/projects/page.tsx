import ProjectHeader from "@/components/projects/project-header";
import ProjectTable from "@/components/projects/project-table";
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  return (
    <>
      <ProjectHeader />
      <ProjectTable search={search} status={status} />
    </>
  );
}
