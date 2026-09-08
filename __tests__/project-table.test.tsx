import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectTable from "../components/projects/project-table";

const { mockGetProjects } = vi.hoisted(() => ({
  mockGetProjects: vi.fn(),
}));

vi.mock("../app/actions/project", () => ({
  getProjects: mockGetProjects,
}));

vi.mock("../components/projects/project-actions", () => ({
  default: () => <div>Project Actions</div>,
}));
vi.mock("../components/ui/pagination", () => ({
  default: () => <div>Pagination</div>,
}));
describe("ProjectTable", () => {
  it("should render projects", async () => {
    mockGetProjects.mockResolvedValue({
      projects: [
        {
          _id: {
            toString: () => "project-1",
          },
          name: "Project Flow",
          key: "PF",
          description: "Project management application",
          status: "active",
          startDate: null,
          endDate: null,
        },
      ],
      total: 1,
    });

    const component = await ProjectTable({
      page: 1,
      limit: 10,
    });

    render(component);

    expect(screen.getByText("Project Flow")).toBeInTheDocument();
    expect(screen.getByText("PF")).toBeInTheDocument();
    expect(
      screen.getByText("Project management application"),
    ).toBeInTheDocument();
  });
  it("should show empty state when no projects are found", async () => {
    mockGetProjects.mockResolvedValue({
      projects: [],
      total: 0,
    });

    const component = await ProjectTable({
      page: 1,
      limit: 10,
    });

    render(component);

    expect(screen.getByText("No projects found")).toBeInTheDocument();
  });
  it("should call getProjects with the correct parameters", async () => {
    mockGetProjects.mockResolvedValue({
      projects: [],
      total: 0,
    });

    const component = await ProjectTable({
      search: "react",
      status: "active",
      page: 2,
      limit: 5,
    });

    render(component);

    expect(mockGetProjects).toHaveBeenCalledWith("react", "active", 2, 5);
  });
  it("should render pagination when there are multiple pages", async () => {
    mockGetProjects.mockResolvedValue({
      projects: [],
      total: 25,
    });

    const component = await ProjectTable({
      page: 1,
      limit: 10,
    });

    render(component);

    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });
  it("should not render pagination when there is only one page", async () => {
    mockGetProjects.mockResolvedValue({
      projects: [],
      total: 5,
    });

    const component = await ProjectTable({
      page: 1,
      limit: 10,
    });

    render(component);

    expect(screen.queryByText("Pagination")).not.toBeInTheDocument();
  });
});
