import React, { useState } from "react";
import { Card, Button, Checkbox } from "../index";
import { DashboardLayout } from "../templates/layouts/DashboardLayout";
import type { DashboardStat } from "../templates/layouts/DashboardLayout";

const sampleStats: DashboardStat[] = [
  {
    title: "Usuarios Totales",
    value: "12,345",
    change: "+12.5%",
    changeType: "positive",
    icon: "fa-users",
  },
  {
    title: "Ingresos",
    value: "$45,678",
    change: "+8.2%",
    changeType: "positive",
    icon: "fa-dollar-sign",
  },
  {
    title: "Pedidos",
    value: "1,234",
    change: "-3.1%",
    changeType: "negative",
    icon: "fa-shopping-cart",
  },
  {
    title: "Tasa de Conversión",
    value: "3.2%",
    change: "0%",
    changeType: "neutral",
    icon: "fa-chart-line",
  },
];

const DashboardLayoutDocs: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DashboardLayout - Template de Layout de Dashboard">
        <div className="space-y-8">
          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Template pre-construido para dashboards. Incluye header con título y
              acciones, tarjetas de estadísticas con indicadores de cambio, y área
              de contenido principal.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Demo
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Checkbox
                label="Modo compacto"
                checked={isCompact}
                onChange={(e) => setIsCompact(e.target.checked)}
              />
            </div>
            <div className="border rounded-lg overflow-hidden">
              <DashboardLayout
                compact={isCompact}
                title="Panel de Control"
                subtitle="Resumen general del sistema"
                stats={sampleStats}
                actions={
                  <>
                    <Button variant="outline" icon="fa-download" size="sm">
                      Exportar
                    </Button>
                    <Button variant="primary" icon="fa-plus" size="sm">
                      Nuevo
                    </Button>
                  </>
                }
              >
                <Card title="Contenido Principal">
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Aquí va el contenido principal del dashboard. Puedes colocar
                    tablas, gráficos, listas u otros componentes.
                  </p>
                </Card>
              </DashboardLayout>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import { DashboardLayout } from "flysoft-react-ui";

const stats = [
  { title: "Usuarios", value: "12,345", change: "+12.5%", changeType: "positive", icon: "fa-users" },
  { title: "Ingresos", value: "$45,678", change: "+8.2%", changeType: "positive", icon: "fa-dollar-sign" },
];

<DashboardLayout
  title="Mi Dashboard"
  subtitle="Resumen general"
  stats={stats}
  actions={<Button>Nueva Acción</Button>}
>
  <div>Contenido del dashboard</div>
</DashboardLayout>`}</code>
            </pre>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props - DashboardLayout
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Default</th>
                    <th className="text-left p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code>title</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Título del dashboard (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>subtitle</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Subtítulo debajo del título</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>stats</code></td>
                    <td className="p-2"><code>DashboardStat[]</code></td>
                    <td className="p-2"><code>[]</code></td>
                    <td className="p-2">Tarjetas de estadísticas a mostrar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>actions</code></td>
                    <td className="p-2"><code>ReactNode</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Acciones en el header (botones, etc.)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>children</code></td>
                    <td className="p-2"><code>ReactNode</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Contenido principal del dashboard (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>className</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>""</code></td>
                    <td className="p-2">Clases CSS adicionales</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Interface - DashboardStat
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Campo</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code>title</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Nombre de la estadística</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>value</code></td>
                    <td className="p-2"><code>string | number</code></td>
                    <td className="p-2">Valor a mostrar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>change</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Texto del cambio (ej. "+12.5%")</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>changeType</code></td>
                    <td className="p-2"><code>"positive" | "negative" | "neutral"</code></td>
                    <td className="p-2">Tipo de cambio (determina color e icono)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>icon</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Icono FontAwesome (ej. "fa-users")</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DashboardLayoutDocs;
