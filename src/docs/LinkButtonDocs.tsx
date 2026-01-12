import React from "react";
import { Card, LinkButton, Button } from "../index";

const LinkButtonDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="LinkButton - Variantes y Ejemplos">
        <div className="space-y-8">
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
              El componente LinkButton se ve y funciona como un Button, pero
              funciona como un enlace. Usa react-router-dom Link para rutas
              internas y un elemento &lt;a&gt; para enlaces externos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" variant="primary">
                  Ruta Interna
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Enlace a ruta interna
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="https://github.com"
                  target="_blank"
                  variant="outline"
                >
                  Enlace Externo
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Enlace externo con target
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/card" variant="ghost">
                  Ghost Link
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Variante ghost
                </p>
              </div>
            </div>
          </section>

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
              LinkButton tiene las mismas variantes que Button: primary, outline
              y ghost.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" variant="primary" icon="fa-check">
                  Primario
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  variante primaria
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" variant="outline" icon="fa-pen">
                  Outline
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  variante outline
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" variant="ghost" icon="fa-trash">
                  Ghost
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  variante ghost
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tamaños
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              LinkButton soporta los mismos tamaños que Button: sm, md y lg.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" size="sm" variant="primary">
                  Pequeño
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño pequeño
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" size="md" variant="primary">
                  Mediano
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño mediano
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton to="/docs/button" size="lg" variant="primary">
                  Grande
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño grande
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes especificar diferentes colores usando la propiedad{" "}
              <code>color</code>. Los colores disponibles son: primary,
              secondary, success, warning, danger e info.
            </p>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Primary
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton to="/docs/button" variant="primary" color="primary">
                    Primary
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    color="secondary"
                  >
                    Secondary
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="primary" color="success">
                    Success
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="primary" color="warning">
                    Warning
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="primary" color="danger">
                    Danger
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="primary" color="info">
                    Info
                  </LinkButton>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Outline
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton to="/docs/button" variant="outline" color="primary">
                    Primary
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    color="secondary"
                  >
                    Secondary
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    color="success"
                  >
                    Success
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    color="warning"
                  >
                    Warning
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="outline" color="danger">
                    Danger
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="outline" color="info">
                    Info
                  </LinkButton>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Ghost
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton to="/docs/button" variant="ghost" color="primary">
                    Primary
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="ghost" color="secondary">
                    Secondary
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="ghost" color="success">
                    Success
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="ghost" color="warning">
                    Warning
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="ghost" color="danger">
                    Danger
                  </LinkButton>
                  <LinkButton to="/docs/button" variant="ghost" color="info">
                    Info
                  </LinkButton>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores personalizados
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes especificar colores personalizados usando las propiedades{" "}
              <code>bg</code> y <code>textColor</code>. Acepta códigos hex,
              rgb, rgba, hsl, o nombres de colores comunes (white, black,
              gray-50, gray-100, etc.).
            </p>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Primary con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="#8b5cf6"
                    textColor="white"
                  >
                    Púrpura
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="#ec4899"
                    textColor="white"
                  >
                    Rosa
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="#14b8a6"
                    textColor="white"
                  >
                    Turquesa
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="rgb(239, 68, 68)"
                    textColor="white"
                  >
                    Rojo RGB
                  </LinkButton>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Outline con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    bg="#8b5cf6"
                    textColor="#8b5cf6"
                  >
                    Púrpura
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    bg="#ec4899"
                    textColor="#ec4899"
                  >
                    Rosa
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    bg="#14b8a6"
                    textColor="#14b8a6"
                  >
                    Turquesa
                  </LinkButton>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Ghost con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton
                    to="/docs/button"
                    variant="ghost"
                    bg="#8b5cf6"
                    textColor="#8b5cf6"
                  >
                    Púrpura
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="ghost"
                    bg="#ec4899"
                    textColor="#ec4899"
                  >
                    Rosa
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="ghost"
                    bg="#14b8a6"
                    textColor="#14b8a6"
                  >
                    Turquesa
                  </LinkButton>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Con nombres de colores
                </h4>
                <div className="flex flex-wrap gap-3">
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="gray-800"
                    textColor="white"
                  >
                    Gray-800
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="primary"
                    bg="gray-700"
                    textColor="white"
                  >
                    Gray-700
                  </LinkButton>
                  <LinkButton
                    to="/docs/button"
                    variant="outline"
                    bg="gray-600"
                    textColor="gray-600"
                  >
                    Gray-600
                  </LinkButton>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con ícono
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              LinkButton soporta iconos FontAwesome 5 en las mismas posiciones que
              Button: izquierda o derecha.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="/docs/button"
                  variant="primary"
                  icon="fa-download"
                >
                  Con ícono (izquierda)
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  ícono a la izquierda
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="/docs/button"
                  variant="outline"
                  icon="fa-arrow-right"
                  iconPosition="right"
                >
                  Ícono a la derecha
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  ícono a la derecha
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="/docs/button"
                  variant="ghost"
                  icon="fa-external-link-alt"
                >
                  Solo ícono
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  sin texto, solo ícono
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Enlaces externos
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              LinkButton detecta automáticamente si el enlace es externo (http://,
              https://, mailto:, tel:) y usa un elemento &lt;a&gt; en lugar de
              react-router-dom Link. Puedes usar la propiedad{" "}
              <code>target</code> para controlar cómo se abre el enlace.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="https://github.com"
                  target="_blank"
                  variant="primary"
                  icon="fa-external-link-alt"
                >
                  GitHub
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  enlace externo con target="_blank"
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="mailto:contacto@ejemplo.com"
                  variant="outline"
                  icon="fa-envelope"
                >
                  Email
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  enlace mailto
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <LinkButton
                  to="tel:+34600000000"
                  variant="ghost"
                  icon="fa-phone"
                >
                  Teléfono
                </LinkButton>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  enlace tel
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Comparación con Button
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              LinkButton tiene el mismo aspecto visual que Button, pero funciona
              como un enlace. Úsalo cuando necesites navegar a otra página o
              enlace externo.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Button (acción)
                </h4>
                <div className="flex gap-2">
                  <Button variant="primary" icon="fa-save">
                    Guardar
                  </Button>
                  <Button variant="outline" icon="fa-cancel">
                    Cancelar
                  </Button>
                </div>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Usa Button para acciones que ocurren en la misma página (guardar,
                  eliminar, etc.)
                </p>
              </div>
              <div className="p-4 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  LinkButton (navegación)
                </h4>
                <div className="flex gap-2">
                  <LinkButton to="/docs/button" variant="primary" icon="fa-link">
                    Ver Documentación
                  </LinkButton>
                  <LinkButton
                    to="https://github.com"
                    target="_blank"
                    variant="outline"
                    icon="fa-external-link-alt"
                  >
                    GitHub
                  </LinkButton>
                </div>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Usa LinkButton para navegar a otras páginas o enlaces externos
                </p>
              </div>
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
                    <strong>Mismo aspecto que Button:</strong> LinkButton tiene
                    exactamente el mismo diseño visual que Button, incluyendo
                    variantes, tamaños e iconos.
                  </li>
                  <li>
                    <strong>Rutas internas:</strong> Para rutas que empiezan con
                    "/", usa react-router-dom Link para navegación del lado del
                    cliente.
                  </li>
                  <li>
                    <strong>Enlaces externos:</strong> Detecta automáticamente
                    enlaces externos (http://, https://, mailto:, tel:) y usa un
                    elemento &lt;a&gt;.
                  </li>
                  <li>
                    <strong>Target opcional:</strong> Puedes especificar el
                    atributo target para controlar cómo se abre el enlace. Para
                    enlaces externos con target="_blank", se agrega
                    automáticamente rel="noopener noreferrer" por seguridad.
                  </li>
                  <li>
                    <strong>Ripple effect:</strong> Incluye el mismo efecto ripple
                    que Button al hacer clic.
                  </li>
                  <li>
                    <strong>Iconos:</strong> Soporta iconos FontAwesome 5 en
                    posición izquierda o derecha.
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Mantiene todas las
                    características de accesibilidad de los enlaces HTML.
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
                      to
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
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      URL o ruta a la que navegar. Puede ser una ruta interna
                      (ej: "/docs/button") o un enlace externo (ej:
                      "https://github.com", "mailto:email@ejemplo.com").
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      target
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
                      Atributo target del enlace (ej: "_blank", "_self"). Para
                      enlaces externos con target="_blank", se agrega
                      automáticamente rel="noopener noreferrer" por seguridad.
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
                      "primary" | "outline" | "ghost"
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
                      Variante visual del botón. Por defecto es "primary".
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      color
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      "primary" | "secondary" | "success" | "warning" | "danger" |
                      "info"
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
                      Color del botón. Por defecto es "primary". Permite usar otros
                      colores del sistema de temas (secondary, success, warning,
                      danger, info).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      size
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      "sm" | "md" | "lg"
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
                      Tamaño del botón. Por defecto es "md".
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
                      se muestra junto al texto.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      iconPosition
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      "left" | "right"
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
                      Posición del icono respecto al texto. Por defecto es
                      "left".
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
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido del botón. Si no se proporciona, solo se muestra
                      el icono (si está definido).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      bg
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
                      Color de fondo personalizado. Acepta códigos hex (ej:
                      "#8b5cf6"), rgb/rgba (ej: "rgb(139, 92, 246)"), hsl, o
                      nombres de colores comunes (white, black, gray-50, etc.).
                      Cuando se especifica, sobrescribe las clases de variante.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      textColor
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
                      Color del texto personalizado. Acepta los mismos formatos
                      que bg. Si no se especifica y hay bg, usa un color por
                      defecto según la variante.
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
                      Clases CSS adicionales.
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

export default LinkButtonDocs;

