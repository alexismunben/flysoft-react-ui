import React from "react";
import { AppLayout, Button, Card, Badge } from "../src";
import "../src/styles";

export const AppLayoutExample: React.FC = () => {
  // Ejemplo de contenido para el navbar
  const navbarContent = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <h2 className="m-0 text-[var(--color-text-primary)] text-xl font-semibold">
          Mi Aplicación
        </h2>
        <Badge variant="primary">v1.0.0</Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <i className="fa fa-bell" />
        </Button>
        <Button variant="outline" size="sm">
          <i className="fa fa-user" />
        </Button>
      </div>
    </div>
  );

  // Ejemplo de contenido para el left drawer
  const leftDrawerContent = (
    <div className="p-4">
      <h3 className="m-0 mb-4 text-[var(--color-text-primary)] text-lg font-semibold">
        Navegación
      </h3>
      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">
          <i className="fa fa-home mr-2" />
          Inicio
        </Button>
        <Button variant="ghost" className="justify-start">
          <i className="fa fa-chart-bar mr-2" />
          Dashboard
        </Button>
        <Button variant="ghost" className="justify-start">
          <i className="fa fa-users mr-2" />
          Usuarios
        </Button>
        <Button variant="ghost" className="justify-start">
          <i className="fa fa-cog mr-2" />
          Configuración
        </Button>
      </nav>
    </div>
  );

  // Ejemplo de contenido principal
  const mainContent = (
    <div className="p-8">
      <Card title="Bienvenido a la Aplicación">
        <p className="text-[var(--color-text-primary)] mb-4">
          Este es un ejemplo del componente AppLayout. Puedes ver cómo funciona:
        </p>
        <ul className="text-[var(--color-text-primary)] space-y-2 mb-6">
          <li>
            En pantallas grandes (lg+): El left drawer se muestra como una
            columna lateral fija
          </li>
          <li>
            En pantallas medianas y pequeñas (md y menores): El left drawer se
            convierte en un menú deslizable
          </li>
          <li>
            El botón de menú aparece en el navbar cuando estás en móvil/tablet
          </li>
          <li>
            Puedes cerrar el menú móvil tocando el overlay o el botón de cerrar
          </li>
        </ul>

        <div className="mt-8">
          <h4 className="text-[var(--color-text-primary)] text-lg font-semibold mb-4">
            Características del AppLayout:
          </h4>
          <ul className="text-[var(--color-text-primary)] space-y-2">
            <li>✅ Navbar opcional con contenido personalizable</li>
            <li>✅ Left drawer opcional que se adapta al tamaño de pantalla</li>
            <li>✅ Hook useBreakpoint para detectar el tamaño de pantalla</li>
            <li>✅ Menú móvil con overlay y animaciones</li>
            <li>✅ Uso de FontAwesome 5 para iconos</li>
            <li>✅ Integración con el sistema de temas de flysoft-react-ui</li>
            <li>✅ Clases de Tailwind CSS para estilos</li>
            <li>✅ Variables CSS del sistema de temas</li>
          </ul>
        </div>

        <div className="mt-8">
          <h4 className="text-[var(--color-text-primary)] text-lg font-semibold mb-4">
            Prueba la responsividad:
          </h4>
          <p className="text-[var(--color-text-primary)]">
            Redimensiona la ventana del navegador para ver cómo el layout se
            adapta automáticamente.
          </p>
        </div>
      </Card>
    </div>
  );

  return (
    <AppLayout navBarDrawer={navbarContent} leftDrawer={leftDrawerContent}>
      {mainContent}
    </AppLayout>
  );
};

export default AppLayoutExample;
