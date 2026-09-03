import Button from "../components/ui/button";
import { expect, it, vi } from "vitest";
import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("should render the button with its text", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", {
      name: "Click Me",
    });
    expect(button).toBeInTheDocument();
  });
  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", {
      name: "Click Me",
    });
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
  it("should be disabled when disabled prop is provided", () => {
    render(<Button disabled>Submit</Button>);
    const button = screen.getByRole("button", {
      name: "Submit",
    });
    expect(button).toBeDisabled();
  });
});
