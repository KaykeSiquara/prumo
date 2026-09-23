import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, Checkbox, Field, IconButton, IconX, RadioGroup, Select, Switch, TextArea, TextInput } from "../index";

describe("Button", () => {
  it("is a real button that defaults to type=button", () => {
    render(<Button variant="primary">Save</Button>);
    const b = screen.getByRole("button", { name: "Save" });
    expect(b).toHaveAttribute("type", "button");
    expect(b).toHaveAttribute("data-variant", "primary");
  });
  it("keeps its name while loading and refuses the click", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save document</Button>);
    const b = screen.getByRole("button", { name: "Save document" });
    expect(b).toHaveAttribute("aria-busy", "true");
    expect(b).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(b);
    expect(onClick).not.toHaveBeenCalled();
  });
  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Delete</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onClick).not.toHaveBeenCalled();
  });
  it("gives an icon-only button its name from the label", () => {
    render(<IconButton label="Close panel"><IconX /></IconButton>);
    expect(screen.getByRole("button", { name: "Close panel" })).toBeInTheDocument();
  });
});

describe("Field", () => {
  it("ties the label, the description and the error to the control", () => {
    render(<Field label="Amount" description="Use a period for the cents." error="The amount is above the balance." required><TextInput /></Field>);
    const input = screen.getByLabelText(/Amount/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("The amount is above the balance. Use a period for the cents.");
  });
  it("is valid and only described by the hint when there is no error", () => {
    render(<Field label="Name" description="As on the ID card."><TextInput /></Field>);
    const input = screen.getByLabelText("Name");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("As on the ID card.");
  });
  it("works for select and textarea too", () => {
    render(<><Field label="Period"><Select><option>March</option></Select></Field><Field label="Notes" disabled><TextArea /></Field></>);
    expect(screen.getByRole("combobox", { name: "Period" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Notes" })).toBeDisabled();
  });
  it("marks a loading input as busy", () => {
    render(<Field label="Supplier"><TextInput loading /></Field>);
    expect(screen.getByLabelText("Supplier")).toHaveAttribute("aria-busy", "true");
  });
});

describe("Checkbox, RadioGroup and Switch", () => {
  it("toggles a checkbox from its label and supports the mixed state", async () => {
    const { rerender } = render(<Checkbox label="Select all" />);
    const box = screen.getByRole("checkbox", { name: "Select all" });
    await userEvent.click(screen.getByText("Select all"));
    expect(box).toBeChecked();
    rerender(<Checkbox label="Select all" indeterminate />);
    expect((box as HTMLInputElement).indeterminate).toBe(true);
  });
  it("names the radio group from its legend and reports the choice", async () => {
    const onValueChange = vi.fn();
    render(<RadioGroup legend="Density" name="density" defaultValue="comfortable" onValueChange={onValueChange} options={[{ value: "comfortable", label: "Comfortable" }, { value: "compact", label: "Compact" }]} />);
    expect(screen.getByRole("group", { name: "Density" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Comfortable" })).toBeChecked();
    await userEvent.click(screen.getByRole("radio", { name: "Compact" }));
    expect(onValueChange).toHaveBeenCalledWith("compact");
  });
  it("flips a switch with the keyboard and says so with aria-checked", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Email notifications" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch", { name: "Email notifications" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    sw.focus();
    await userEvent.keyboard(" ");
    expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{Enter}");
    expect(sw).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });
});
