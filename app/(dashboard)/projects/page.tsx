import ProjectHeader from "@/components/projects/project-header";
import ProjectTable from "@/components/projects/project-table";
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  return (
    <>
      <ProjectHeader />
      <ProjectTable search={search} status={status} page={page} limit={limit} />
    </>
  );
}
