import { render, screen } from "@testing-library/react";
import Input from "../components/ui/form/input";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import { it } from "vitest";

describe("Input", () => {
  it("should allow the user to type into the input", async () => {
    const user = userEvent.setup();
    render(<Input label="Project Name" name="name" />);
    const input = screen.getByLabelText("Project Name");
    await user.type(input, "Project Flow");
    expect(input).toHaveValue("Project Flow");
  });
  it("should display the error message", () => {
    render(
      <Input
        label="Project Name"
        name="name"
        error="Project name is required"
      />,
    );
    expect(screen.getByText("Project name is required")).toBeInTheDocument();
  });
});
