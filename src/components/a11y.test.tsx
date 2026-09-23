import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Alert, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Dialog, EmptyState, Field, IconButton, IconX, Kbd, Link, Pagination, Progress, RadioGroup, Select, Skeleton, Spinner, Stat, Switch, Tab, Table, TabList, TabPanel, Tabs, Td, TextArea, TextInput, Th } from "../index";

const run = async (node: Element) => {
  const r = await axe.run(node, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }, rules: { "color-contrast": { enabled: false } } });
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
};

function KitchenSink() {
  return (
    <main>
      <h1>Prumo</h1>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components" }]} />
      <Button variant="primary">Save</Button> <Button loading>Saving</Button> <IconButton label="Close"><IconX /></IconButton>
      <Field label="Amount" description="Use a period for the cents." error="Too high." required><TextInput /></Field>
      <Field label="Period"><Select><option>March</option></Select></Field>
      <Field label="Notes"><TextArea /></Field>
      <Checkbox label="Select all" indeterminate />
      <RadioGroup legend="Density" name="d" defaultValue="a" options={[{ value: "a", label: "Comfortable" }, { value: "b", label: "Compact" }]} />
      <Switch label="Notifications" description="Email me when a document is due." />
      <Badge tone="success" icon="●">Paid</Badge>
      <Alert tone="warning" title="Two documents are due today">Approve or reject them before 6 pm.</Alert>
      <Progress label="Budget used" value={40} showValue />
      <Spinner label="Loading documents" /> <Skeleton width={120} />
      <Card title="Summary" actions={<Button size="sm">Edit</Button>}><Stat label="Paid" value="R$ 10,00" delta="up 4%" trend="up" /></Card>
      <p>Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>. <Link href="https://example.org" external>Docs</Link></p>
      <Tabs label="Views" defaultValue="a"><TabList label="Views"><Tab value="a">Table</Tab><Tab value="b">Cards</Tab></TabList><TabPanel value="a">Table view</TabPanel><TabPanel value="b">Cards view</TabPanel></Tabs>
      <Table caption="Documents"><thead><tr><Th sort="descending" onSort={() => {}}>Amount</Th><Th>Supplier</Th></tr></thead><tbody><tr><Td label="Amount" numeric>R$ 1,00</Td><Td label="Supplier">Aurora</Td></tr></tbody></Table>
      <Pagination page={2} pages={9} onPageChange={() => {}} />
      <Avatar name="Rita Almeida" />
      <EmptyState title="No documents" action={<Button>Clear filters</Button>}>Nothing matches these filters.</EmptyState>
    </main>
  );
}

describe("axe", () => {
  it("finds no WCAG 2.1 A or AA violations across the components", async () => {
    const { container } = render(<KitchenSink />);
    expect(await run(container)).toEqual([]);
  });
  it("finds none in an open dialog either", async () => {
    const user = userEvent.setup();
    render(<Dialog title="Invite someone" description="They join with the role you pick." trigger={<Button>Invite</Button>}><Field label="Email"><TextInput type="email" /></Field></Dialog>);
    await user.click(screen.getByRole("button", { name: "Invite" }));
    expect(await run(document.body)).toEqual([]);
  });
});
