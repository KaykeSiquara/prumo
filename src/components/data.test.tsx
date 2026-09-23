import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Avatar, Breadcrumb, Pagination, pageWindow, Progress, Stat, Table, Td, Th } from "../index";

describe("Table", () => {
  it("marks only the sorted column with aria-sort and sorts from its button", async () => {
    const onSort = vi.fn();
    render(
      <Table caption="Documents">
        <thead><tr><Th sort="ascending" onSort={onSort}>Amount</Th><Th sort={false}>Supplier</Th><Th>Notes</Th></tr></thead>
        <tbody><tr><Td label="Amount" numeric>R$ 10,00</Td><Td label="Supplier">Aurora</Td><Td>-</Td></tr></tbody>
      </Table>,
    );
    expect(screen.getByRole("table", { name: "Documents" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Amount/ })).toHaveAttribute("aria-sort", "ascending");
    expect(screen.getByRole("columnheader", { name: /Supplier/ })).not.toHaveAttribute("aria-sort");
    await userEvent.click(screen.getByRole("button", { name: /Amount/ }));
    expect(onSort).toHaveBeenCalled();
    expect(screen.getByRole("cell", { name: "R$ 10,00" })).toHaveAttribute("data-label", "Amount");
  });
});

describe("Pagination", () => {
  it("windows long page lists around the current page", () => {
    expect(pageWindow(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(pageWindow(6, 20)).toEqual([1, "gap", 5, 6, 7, "gap", 20]);
    expect(pageWindow(1, 20)).toEqual([1, 2, "gap", 20]);
  });
  it("marks the current page and blocks Previous on the first", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pages={12} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /Previous/ })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: /Next/ }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

describe("display", () => {
  it("marks the last breadcrumb as the current page", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Documents", href: "/documents" }, { label: "NF 2.481" }]} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("NF 2.481")).toHaveAttribute("aria-current", "page");
  });
  it("names an avatar after the person", () => expect(render(<Avatar name="Marina Duarte" />).getByRole("img", { name: "Marina Duarte" })).toHaveTextContent("MD"));
  it("reports progress as a value, or as indeterminate", () => {
    const { rerender } = render(<Progress label="Budget used" value={62} />);
    expect(screen.getByRole("progressbar", { name: "Budget used" })).toHaveAttribute("aria-valuenow", "62");
    rerender(<Progress label="Budget used" />);
    expect(screen.getByRole("progressbar", { name: "Budget used" })).not.toHaveAttribute("aria-valuenow");
  });
  it("writes the trend as a word, the arrow is decorative", () => {
    render(<Stat label="Paid this month" value="R$ 113.829,17" delta="14% more than last month" trend="up" />);
    expect(screen.getByText(/14% more than last month/)).toHaveTextContent("↑ 14% more than last month");
    expect(screen.getByText("↑", { exact: false }).querySelector("[aria-hidden]") ?? screen.getByText("↑")).toBeInTheDocument();
  });
});
