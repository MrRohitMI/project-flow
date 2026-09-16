import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectActions from "../components/projects/project-actions";

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock("../app/actions/project", () => ({
  deleteProject: vi.fn(),
}));

describe("ProjectActions", () => {
  it("should have render edit and delete buttons", () => {
    render(
      <ProjectActions
        projectId="project-1"
        project={{
          name: "Project Flow",
          key: "PF",
          description: "Project management application",
          status: "active",
          startDate: null,
          endDate: null,
        }}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});