import { Tab, TabList, TabPanel, Tabs } from "@prumo";

export default function Basic() {
  return (
    <Tabs label="Document views" defaultValue="details">
      <TabList label="Document views">
        <Tab value="details">Details</Tab>
        <Tab value="history">History</Tab>
        <Tab value="files" disabled>Files</Tab>
      </TabList>
      <TabPanel value="details">Supplier, program, amount and due date.</TabPanel>
      <TabPanel value="history">Who created, approved or rejected it, and when.</TabPanel>
    </Tabs>
  );
}
