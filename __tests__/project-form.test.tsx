import ProjectForm from "../components/projects/project-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));
const mockFormAction = vi.fn();
vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  return {
    ...actual,
    useActionState: () => [
      {
        success: false,
        message: "Please fix the errors",
        errors: {
          name: "Project name is required",
        },
      },
      mockFormAction,
      false,
    ],
  };
});

describe("ProjectForm", () => {
  it("should render all project fields", () => {
    render(<ProjectForm />);
    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Key")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
  it("should display validation errors", () => {
    render(<ProjectForm />);

    expect(screen.getByText("Project name is required")).toBeInTheDocument();

    expect(screen.getByText("Please fix the errors")).toBeInTheDocument();
  });
  it("should submit the project form", async () => {
    const user = userEvent.setup();

    render(<ProjectForm />);

    const nameInput = screen.getByLabelText("Project Name");
    const keyInput = screen.getByLabelText("Project Key");

    await user.type(nameInput, "Project Flow");
    await user.type(keyInput, "PF");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockFormAction).toHaveBeenCalled();
  });
});
