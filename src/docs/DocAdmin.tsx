import React, { useState, useEffect } from "react";
import { Button, Card, Badge } from "../index";
import {
  inicializarDatosEjemplo,
  empresaService,
  personaService,
  personaEmpresaService,
} from "./docMockServices";

const DocAdmin: React.FC = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [stats, setStats] = useState({
    empresas: 0,
    personas: 0,
    relaciones: 0,
  });

  // Cargar estadísticas iniciales
  useEffect(() => {
    const init = async () => {
      await actualizarStats();

      // Inicializar datos si no existen
      const empresas = await empresaService.listar();
      const personas = await personaService.listar();
      if (empresas.length === 0 && personas.length === 0) {
        await inicializarDatosEjemplo();
        await actualizarStats();
      }
    };
    init();
  }, []);

  const actualizarStats = async () => {
    const [empresas, personas, relaciones] = await Promise.all([
      empresaService.listar(),
      personaService.listar(),
      personaEmpresaService.listar(),
    ]);
    setStats({
      empresas: empresas.length,
      personas: personas.length,
      relaciones: relaciones.length,
    });
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas reiniciar todos los datos? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setIsResetting(true);
    try {
      await inicializarDatosEjemplo();
      await actualizarStats();
      setIsResetting(false);
      alert("Datos reiniciados correctamente");
    } catch (error) {
      console.error("Error al reiniciar datos:", error);
      setIsResetting(false);
      alert("Error al reiniciar los datos");
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Administración de Datos Mock"
        subtitle="Gestiona los datos de ejemplo para la documentación"
      >
        <div className="space-y-6">
          {/* Estadísticas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
              Estadísticas Actuales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" icon="fa-building" size="sm">
                    Empresas
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {stats.empresas}
                </p>
              </div>
              <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" icon="fa-users" size="sm">
                    Personas
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {stats.personas}
                </p>
              </div>
              <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info" icon="fa-link" size="sm">
                    Relaciones
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {stats.relaciones}
                </p>
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">
              <i className="fa fa-info-circle mr-2 text-[var(--color-info)]" />
              Información
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Los datos se almacenan en localStorage y se utilizan en los
              ejemplos de documentación. Al reiniciar, se restaurarán 20
              empresas, 20 personas y sus relaciones iniciales.
            </p>
          </div>

          {/* Botón de Reset */}
          <div className="flex justify-center">
            <Button
              variant="danger"
              icon="fa-redo"
              onClick={handleReset}
              disabled={isResetting}
              loading={isResetting}
            >
              {isResetting ? "Reiniciando..." : "Reiniciar Datos Locales"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Documentación de Servicios */}
      <Card
        title="Servicios Disponibles"
        subtitle="Documentación de los servicios mock disponibles"
      >
        <div className="space-y-4">
          {/* Empresa Service */}
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                empresaService
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Servicio para gestionar empresas
            </p>
            <div className="space-y-1 text-sm font-mono text-[var(--color-text-primary)]">
              <div>• listar(params?: {"{"} filtro?: string {"}"}): Promise&lt;Empresa[]&gt;</div>
              <div>• listarPaginados(params?: {"{"} filtro?: string, pagina?: number, limit?: number {"}"}): Promise&lt;PaginationInterface&lt;Empresa&gt;&gt;</div>
              <div>• buscarPorId(id: number): Promise&lt;Empresa | undefined&gt;</div>
              <div>• agregar(empresa: Omit&lt;Empresa, &quot;id&quot;&gt;): Promise&lt;Empresa&gt;</div>
              <div>• editar(id: number, datos: Partial&lt;...&gt;): Promise&lt;Empresa | null&gt;</div>
              <div>• eliminar(id: number): Promise&lt;boolean&gt;</div>
            </div>
          </div>

          {/* Persona Service */}
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" icon="fa-code" size="sm">
                personaService
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Servicio para gestionar personas
            </p>
            <div className="space-y-1 text-sm font-mono text-[var(--color-text-primary)]">
              <div>• listar(params?: {"{"} filtro?: string {"}"}): Promise&lt;Persona[]&gt;</div>
              <div>• listarPaginados(params?: {"{"} filtro?: string, pagina?: number, limit?: number {"}"}): Promise&lt;PaginationInterface&lt;Persona&gt;&gt;</div>
              <div>• buscarPorId(id: number): Promise&lt;Persona | undefined&gt;</div>
              <div>• agregar(persona: Omit&lt;Persona, &quot;id&quot;&gt;): Promise&lt;Persona&gt;</div>
              <div>• editar(id: number, datos: Partial&lt;...&gt;): Promise&lt;Persona | null&gt;</div>
              <div>• eliminar(id: number): Promise&lt;boolean&gt;</div>
            </div>
          </div>

          {/* PersonaEmpresa Service */}
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="info" icon="fa-code" size="sm">
                personaEmpresaService
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Servicio para gestionar relaciones persona-empresa (muchos a muchos)
            </p>
            <div className="space-y-1 text-sm font-mono text-[var(--color-text-primary)]">
              <div>• listar(): Promise&lt;PersonaEmpresa[]&gt;</div>
              <div>• buscarPorPersona(idPersona: number): Promise&lt;PersonaEmpresa[]&gt;</div>
              <div>• buscarPorEmpresa(idEmpresa: number): Promise&lt;PersonaEmpresa[]&gt;</div>
              <div>• buscarPorPersonaYEmpresa(idPersona, idEmpresa): Promise&lt;PersonaEmpresa | undefined&gt;</div>
              <div>• agregar(relacion: PersonaEmpresa): Promise&lt;PersonaEmpresa&gt;</div>
              <div>• editar(idPersona, idEmpresa, datos): Promise&lt;PersonaEmpresa | null&gt;</div>
              <div>• eliminar(idPersona, idEmpresa): Promise&lt;boolean&gt;</div>
              <div>• eliminarPorPersona(idPersona): Promise&lt;number&gt;</div>
              <div>• eliminarPorEmpresa(idEmpresa): Promise&lt;number&gt;</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interfaces */}
      <Card
        title="Interfaces TypeScript"
        subtitle="Estructuras de datos utilizadas"
      >
        <div className="space-y-4">
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                Interface
              </Badge>
              <code className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                Empresa
              </code>
            </div>
            <pre className="text-xs bg-[var(--color-bg-default)] p-3 rounded border border-[var(--color-border-default)] overflow-x-auto">
{`interface Empresa {
  id: number;
  nombre: string;
}`}
            </pre>
          </div>

          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                Interface
              </Badge>
              <code className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                Persona
              </code>
            </div>
            <pre className="text-xs bg-[var(--color-bg-default)] p-3 rounded border border-[var(--color-border-default)] overflow-x-auto">
{`interface Persona {
  id: number;
  nombre: string;
  email: string;
}`}
            </pre>
          </div>

          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                Interface
              </Badge>
              <code className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                PersonaEmpresa
              </code>
            </div>
            <pre className="text-xs bg-[var(--color-bg-default)] p-3 rounded border border-[var(--color-border-default)] overflow-x-auto">
{`interface PersonaEmpresa {
  idPersona: number;
  idEmpresa: number;
  cargo: string;
}`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocAdmin;

