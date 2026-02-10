import { Badge, Button, Card, Collection, DataField } from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { AppLayoutProvider } from "./index";
import "./index.css";
import { DocsMenu } from "./docs/DocsMenu";
import DocsRouter from "./docs/DocsRouter";
import { AuthDocs } from "./docs/AuthDocs.tsx/AuthDocs";
import packageJson from "../package.json";

function HomeContent() {
  return (
    <>
      <Card title="Empleados" className="bg-gray-50">
        <Card
          className="w-1/2"
          title="FALCONE WALTER ALDO"
          subtitle="3558-03 - Titular"
          footer={<Button>Ver</Button>}
          headerActions={
            <>
              <Badge variant="secondary">OSOCNA</Badge>
              <Badge variant="secondary">BÁSICO</Badge>
            </>
          }
        >
          <Collection direction="row" gap="1rem" wrap>
            <DataField label="Cuil" value="20179902711" />
            <DataField label="Doc" value="17990271" />
            <DataField label="F Nac" value="23/06/1966" />
            <DataField label="F Alta" value="01/03/2012" />
          </Collection>
        </Card>
      </Card>
      <div>
        <AuthDocs />
      </div>
    </>
  );
}

function LeftDrawerHeader() {
  return (
    <div className="h-[64px] flex flex-col  justify-center px-4 bg-gray-300">
      <h2 className="text-lg font-bold text-accent">
        <Link to="/">Flysoft React UI</Link>
      </h2>
    </div>
  );
}

function LeftDrawerFooter() {
  return (
    <div className="px-4 bg-gray-300">
      <span>v {packageJson.version}</span>
    </div>
  );
}

function App() {
  return (
    <AppLayoutProvider
      initialTheme={"light"}
      forceInitialTheme={false}
      /*initialNavbar={{
        navBarLeftNode: <>LEFT NODE</>,
        fullWidthNavbar: false,
        className: "bg-gray-300 pl-0 lg:pl-8",
      }}*/
      /*initialLeftDrawer={{
        headerNode: <LeftDrawerHeader />,
        contentNode: <DocsMenu />,
        footerNode: <LeftDrawerFooter />,
      }}*/
    >
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/docs/*" element={<DocsRouter />} />
      </Routes>
    </AppLayoutProvider>
  );
}

export default App;
