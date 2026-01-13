import React, { useState } from "react";
import { Accordion, Card, Button, Badge, Input } from "../index";

const AccordionDocs: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());

  const handleToggle = (id: string, isOpen: boolean) => {
    const newSet = new Set(openAccordions);
    if (isOpen) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setOpenAccordions(newSet);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Accordion - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Variantes
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente Accordion soporta tres variantes visuales: default,
              elevated (con sombra) y outlined (con borde destacado).
            </p>
            <div className="space-y-3">
              <Accordion variant="default" title="Default">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con variante por defecto.
                </p>
              </Accordion>
              <Accordion variant="elevated" title="Elevated">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con sombra elevada.
                </p>
              </Accordion>
              <Accordion variant="outlined" title="Outlined">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con borde destacado.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente Accordion permite mostrar contenido colapsable con
              una animación suave de expandir/contraer. Haz clic en el header
              para abrir o cerrar el contenido.
            </p>
            <div className="space-y-3">
              <Accordion title="Información General">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Este es un accordion básico sin icono ni elementos adicionales.
                  El contenido se muestra cuando el accordion está abierto y se
                  oculta con una animación suave cuando está cerrado.
                </p>
              </Accordion>
              <Accordion title="Detalles del Producto" defaultOpen>
                <div className="space-y-2">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Este accordion está abierto por defecto usando la propiedad{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      defaultOpen
                    </code>
                    .
                  </p>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>Característica 1: Descripción detallada</li>
                    <li>Característica 2: Más información</li>
                    <li>Característica 3: Detalles adicionales</li>
                  </ul>
                </div>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con icono
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes agregar un icono FontAwesome 5 del lado izquierdo del título
              usando la propiedad <code>icon</code>.
            </p>
            <div className="space-y-3">
              <Accordion title="Configuración" icon="fa-cog">
                <div className="space-y-2">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Este accordion tiene un icono de configuración en el lado
                    izquierdo.
                  </p>
                  <Input label="Nombre" placeholder="Ingresa un nombre" />
                  <Input label="Email" type="email" placeholder="correo@ejemplo.com" />
                </div>
              </Accordion>
              <Accordion title="Información de Usuario" icon="fa-user">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con icono de usuario. Los iconos ayudan a identificar
                  visualmente el tipo de contenido.
                </p>
              </Accordion>
              <Accordion title="Notificaciones" icon="fa-bell">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con icono de notificaciones. Puedes usar cualquier
                  icono de FontAwesome 5.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con rightNode
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              La propiedad <code>rightNode</code> permite agregar contenido
              personalizado del lado derecho, antes del chevron. Útil para badges,
              botones pequeños, contadores, etc.
            </p>
            <div className="space-y-3">
              <Accordion
                title="Mensajes"
                icon="fa-envelope"
                rightNode={<Badge variant="info">3</Badge>}
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Este accordion muestra un badge con el número de mensajes no
                  leídos en el lado derecho.
                </p>
              </Accordion>
              <Accordion
                title="Tareas Pendientes"
                icon="fa-tasks"
                rightNode={<Badge variant="warning">5</Badge>}
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con badge de tareas pendientes. El rightNode puede
                  contener cualquier ReactNode.
                </p>
              </Accordion>
              <Accordion
                title="Configuración Avanzada"
                icon="fa-sliders-h"
                rightNode={
                  <div
                    className="flex items-center gap-2 px-2 py-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Editar configuración");
                    }}
                  >
                    <i className="fal fa-edit" />
                    <span>Editar</span>
                  </div>
                }
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Este accordion incluye un elemento de acción en el rightNode,
                  permitiendo acciones rápidas sin abrir el accordion. Nota: No
                  uses componentes Button dentro de rightNode ya que causaría un
                  error de anidación de botones.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con callback onToggle
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              La propiedad <code>onToggle</code> permite ejecutar una función
              cuando el accordion se abre o cierra. Útil para sincronizar estado
              externo o realizar acciones al cambiar el estado.
            </p>
            <div className="space-y-3">
              {openAccordions.size > 0 && (
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p className="text-sm">
                    <span className="font-semibold">Accordions abiertos:</span>{" "}
                    <span style={{ color: "var(--flysoft-text-secondary)" }}>
                      {Array.from(openAccordions).join(", ") || "Ninguno"}
                    </span>
                  </p>
                </div>
              )}
              <Accordion
                title="Sección 1"
                icon="fa-folder"
                onToggle={(isOpen) => handleToggle("seccion1", isOpen)}
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Este accordion notifica cuando se abre o cierra mediante el
                  callback onToggle.
                </p>
              </Accordion>
              <Accordion
                title="Sección 2"
                icon="fa-folder"
                onToggle={(isOpen) => handleToggle("seccion2", isOpen)}
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Otro accordion que también notifica su estado mediante
                  onToggle.
                </p>
              </Accordion>
              <Accordion
                title="Sección 3"
                icon="fa-folder"
                onToggle={(isOpen) => handleToggle("seccion3", isOpen)}
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Un tercer accordion para demostrar el seguimiento de múltiples
                  accordions.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo completo con múltiples accordions
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo práctico usando múltiples accordions para organizar
              información en secciones colapsables.
            </p>
            <div className="space-y-3">
              <Accordion
                title="Información Personal"
                icon="fa-user-circle"
                rightNode={<Badge variant="success">Completo</Badge>}
              >
                <div className="space-y-3">
                  <Input label="Nombre" placeholder="Juan" icon="fa-user" />
                  <Input
                    label="Apellido"
                    placeholder="Pérez"
                    icon="fa-user"
                  />
                  <Input
                    label="Fecha de Nacimiento"
                    type="date"
                    icon="fa-calendar"
                  />
                </div>
              </Accordion>
              <Accordion
                title="Información de Contacto"
                icon="fa-address-book"
                rightNode={<Badge variant="warning">Pendiente</Badge>}
              >
                <div className="space-y-3">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    icon="fa-envelope"
                  />
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+34 600 000 000"
                    icon="fa-phone"
                  />
                </div>
              </Accordion>
              <Accordion
                title="Configuración de Seguridad"
                icon="fa-shield-alt"
                rightNode={<Badge variant="info">Recomendado</Badge>}
              >
                <div className="space-y-3">
                  <Input
                    label="Contraseña Actual"
                    type="password"
                    placeholder="••••••••"
                    icon="fa-lock"
                  />
                  <Input
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="••••••••"
                    icon="fa-key"
                  />
                </div>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Background Personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente detecta automáticamente las clases de background
              (bg-*) desde la prop className y las aplica al background del
              accordion. Las demás clases se aplican normalmente al contenedor.
            </p>
            <div className="space-y-3">
              <Accordion
                title="Accordion con bg-blue-50"
                className="bg-blue-50"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con background personalizado usando clases de Tailwind.
                </p>
              </Accordion>
              <Accordion
                title="Accordion con bg-gradient"
                className="bg-gradient-to-br from-purple-100 to-pink-100"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Accordion con gradiente personalizado.
                </p>
              </Accordion>
              <Accordion
                title="Accordion con bg y otras clases"
                className="bg-green-50"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Puedes combinar clases de background con otras clases de
                  Tailwind.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Title como ReactNode
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El título puede ser un ReactNode, permitiendo incluir contenido
              personalizado como badges, iconos adicionales, o cualquier otro
              componente.
            </p>
            <div className="space-y-3">
              <Accordion
                title={
                  <div className="flex items-center gap-2">
                    <span>Proyecto Importante</span>
                    <Badge variant="danger" size="sm">
                      Urgente
                    </Badge>
                  </div>
                }
                icon="fa-project-diagram"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Este accordion tiene un título personalizado con un badge
                  integrado.
                </p>
              </Accordion>
              <Accordion
                title={
                  <div className="flex items-center gap-2">
                    <i className="fal fa-star text-yellow-500" />
                    <span>Favoritos</span>
                  </div>
                }
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Título personalizado con un icono de estrella integrado.
                </p>
              </Accordion>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Animación suave:</strong> El contenido se expande y
                    contrae con una animación CSS de 300ms.
                  </li>
                  <li>
                    <strong>Icono opcional:</strong> Soporta iconos FontAwesome 5
                    del lado izquierdo del título.
                  </li>
                  <li>
                    <strong>RightNode:</strong> Permite agregar contenido
                    personalizado (badges, botones, etc.) del lado derecho antes
                    del chevron.
                  </li>
                  <li>
                    <strong>Estado controlado:</strong> Soporta estado controlado
                    mediante <code>defaultOpen</code> y <code>onToggle</code>.
                  </li>
                  <li>
                    <strong>Title flexible:</strong> El título puede ser un string
                    o un ReactNode, permitiendo contenido personalizado.
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Incluye atributos ARIA para
                    mejor accesibilidad.
                  </li>
                  <li>
                    <strong>Chevron dinámico:</strong> El chevron cambia
                    automáticamente entre arriba (abierto) y abajo (cerrado).
                  </li>
                  <li>
                    <strong>Variantes:</strong> Soporta tres variantes: default,
                    elevated (con sombra) y outlined (con borde destacado).
                  </li>
                  <li>
                    <strong>Background personalizado:</strong> El componente
                    detecta automáticamente las clases de background (bg-*) y las
                    aplica correctamente.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Requerido
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      title
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string | ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Título del accordion. Puede ser un string o un ReactNode.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      children
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido que se muestra cuando el accordion está abierto.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      icon
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Clase de icono FontAwesome 5 (ej: "fa-user", "fa-cog") que
                      se muestra del lado izquierdo del título.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      rightNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido personalizado que se muestra del lado derecho,
                      antes del chevron. Útil para badges, botones, contadores,
                      etc.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      defaultOpen
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      boolean
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Si es true, el accordion estará abierto por defecto. Por
                      defecto es false.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      onToggle
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      (isOpen: boolean) =&gt; void
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Callback que se ejecuta cuando el accordion se abre o cierra.
                      Recibe un boolean indicando si está abierto (true) o cerrado
                      (false).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      variant
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      "default" | "elevated" | "outlined"
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Variante visual del accordion. Por defecto es "default".
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      className
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Clases CSS adicionales. Las clases de background (bg-*) se
                      aplican automáticamente al background del accordion.
                    </td>
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

export default AccordionDocs;

