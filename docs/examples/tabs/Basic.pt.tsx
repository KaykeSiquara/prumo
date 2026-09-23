import { Tab, TabList, TabPanel, Tabs } from "@prumo";

export default function Basic() {
  return (
    <Tabs label="Visões do documento" defaultValue="details">
      <TabList label="Visões do documento">
        <Tab value="details">Detalhes</Tab>
        <Tab value="history">Histórico</Tab>
        <Tab value="files" disabled>Arquivos</Tab>
      </TabList>
      <TabPanel value="details">Fornecedor, programa, valor e vencimento.</TabPanel>
      <TabPanel value="history">Quem cadastrou, aprovou ou glosou, e quando.</TabPanel>
    </Tabs>
  );
}
