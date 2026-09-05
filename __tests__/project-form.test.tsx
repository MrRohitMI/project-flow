import { setSuccessMessage } from "@/store/slices/uiSlice";
import ProjectForm from "../components/projects/project-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
const mockRefresh = vi.fn();
const mockDispatch = vi.fn();
const mockFormAction = vi.fn();
let mockSuccess = false;
let mockMessage = "Please fix the errors";
let mockIsPending = false;

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));
vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");

  return {
    ...actual,
    useActionState: () => [
      {
        success: mockSuccess,
        message: mockMessage,
        errors: { name: "Project name is required" },
      },
      mockFormAction,
      mockIsPending,
    ],
  };
});
afterEach(() => {
  mockIsPending = false;
  mockSuccess = false;
  mockMessage = "Please fix the errors";
  vi.clearAllMocks();
});

describe("ProjectForm", () => {
  it("should render all project fields", () => {
    render(<ProjectForm />);
    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Key")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Description")).toBeInTheDocument();
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

    expect(nameInput).toHaveValue("Project Flow");
    expect(keyInput).toHaveValue("PF");
  });
  it("should show submitting state when form is pending", () => {
    mockIsPending = true;
    render(<ProjectForm />);

    const submitButton = screen.getByRole("button", {
      name: "Submitting",
    });

    expect(submitButton).toBeDisabled();
  });
  it("should handle successful project submission", () => {
    mockSuccess = true;
    mockMessage = "Project created successfully";

    const mockOnClose = vi.fn();

    render(<ProjectForm onClose={mockOnClose} />);

    expect(mockRefresh).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith(
      setSuccessMessage("Project created successfully"),
    );

    expect(mockOnClose).toHaveBeenCalled();
  });
});
