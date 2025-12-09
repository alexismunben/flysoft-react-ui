import {
  AppLayout,
  Badge,
  Button,
  Card,
  Collection,
  DataField,
} from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./index";
import "./index.css";
import { DocsMenu } from "./docs/DocsMenu";
import DocsRouter from "./docs/DocsRouter";
import { OsocnaSaludTheme } from "./contexts/presets";

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
    </>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme={OsocnaSaludTheme} forceInitialTheme={false}>
      <AppLayout
        navBarDrawer={
          <h2>
            <Link to="/">Flysoft React UI</Link>
          </h2>
        }
        leftDrawer={<DocsMenu />}
      >
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/docs/*" element={<DocsRouter />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
