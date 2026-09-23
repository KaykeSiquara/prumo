import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, ConfirmDialog, Dialog, Menu, MenuItem, Tab, TabList, TabPanel, Tabs, ToastProvider, Tooltip, useToast } from "../index";

describe("Dialog", () => {
  it("moves focus inside, closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Dialog title="Delete batch" description="Six documents will be removed." trigger={<Button>Open</Button>}><Button>Inside</Button></Dialog>);
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Delete batch" });
    expect(dialog).toHaveAccessibleDescription("Six documents will be removed.");
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it("keeps Tab inside the dialog", async () => {
    const user = userEvent.setup();
    render(<Dialog title="Edit" defaultOpen><Button>First</Button><Button>Second</Button></Dialog>);
    const dialog = screen.getByRole("dialog", { name: "Edit" });
    for (let i = 0; i < 5; i++) { await user.tab(); expect(dialog.contains(document.activeElement)).toBe(true); }
  });
  it("uses alertdialog for confirmations and runs the action", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<ConfirmDialog title="Reject 2 documents?" confirmLabel="Reject" tone="danger" onConfirm={onConfirm} defaultOpen />);
    const dialog = screen.getByRole("alertdialog", { name: "Reject 2 documents?" });
    await user.click(within(dialog).getByRole("button", { name: "Reject" }));
    expect(onConfirm).toHaveBeenCalled();
  });
});

describe("Menu, Tabs and Tooltip", () => {
  it("opens a menu from the keyboard and selects an item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Menu trigger={<Button>Actions</Button>}><MenuItem onSelect={onSelect}>Export CSV</MenuItem><MenuItem tone="danger">Delete</MenuItem></Menu>);
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{Enter}");
    const item = await screen.findByRole("menuitem", { name: "Export CSV" });
    await user.click(item);
    expect(onSelect).toHaveBeenCalled();
  });
  it("moves between tabs with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tabs label="Settings" defaultValue="profile"><TabList label="Settings"><Tab value="profile">Profile</Tab><Tab value="plan">Plan</Tab></TabList><TabPanel value="profile">Profile panel</TabPanel><TabPanel value="plan">Plan panel</TabPanel></Tabs>);
    await user.click(screen.getByRole("tab", { name: "Profile" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Plan" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Plan" })).toHaveTextContent("Plan panel");
  });
  it("shows a tooltip on keyboard focus", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Export the filtered rows"><Button>Export</Button></Tooltip>);
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Export the filtered rows");
  });
});

describe("Toast", () => {
  function Demo() {
    const toast = useToast();
    return <Button onClick={() => toast("3 documents approved.", { tone: "success" })}>Approve</Button>;
  }
  it("announces in one polite region and can be dismissed", async () => {
    const user = userEvent.setup();
    render(<ToastProvider><Demo /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "Approve" }));
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("3 documents approved.");
    await user.click(within(region).getByRole("button", { name: "Dismiss" }));
    expect(region).not.toHaveTextContent("3 documents approved.");
  });
});
