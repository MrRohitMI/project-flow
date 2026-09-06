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
      screen.getByText("Project management application")
    ).toBeInTheDocument();
  });
});