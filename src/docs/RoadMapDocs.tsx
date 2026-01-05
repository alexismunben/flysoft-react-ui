import React, { useState } from "react";
import { RoadMap, Card } from "../index";

const RoadMapDocs: React.FC = () => {
  const basicStages = [
    { name: "Inicio", variant: "primary" as const },
    { name: "Progreso", variant: "success" as const },
    { name: "Finalización", variant: "info" as const },
  ];

  const stagesWithDescriptions = [
    {
      name: "Planificación",
      description: "Definir requisitos y alcance del proyecto",
      variant: "primary" as const,
    },
    {
      name: "Desarrollo",
      description: "Construir las funcionalidades principales",
      variant: "success" as const,
    },
    {
      name: "Pruebas",
      description: "Realizar testing completo del sistema",
      variant: "warning" as const,
    },
    {
      name: "Lanzamiento",
      description: "Publicar y desplegar la aplicación",
      variant: "info" as const,
    },
  ];

  const stagesWithIcons = [
    {
      name: "Análisis",
      description: "Analizar requerimientos",
      icon: "fa-search",
      variant: "primary" as const,
    },
    {
      name: "Diseño",
      description: "Crear el diseño de la solución",
      icon: "fa-pencil-alt",
      variant: "secondary" as const,
    },
    {
      name: "Implementación",
      description: "Desarrollar la solución",
      icon: "fa-code",
      variant: "success" as const,
    },
    {
      name: "Despliegue",
      description: "Publicar en producción",
      icon: "fa-rocket",
      variant: "info" as const,
    },
  ];

  const disabledStages = [
    {
      name: "Completado",
      description: "Esta etapa ya está finalizada",
      icon: "fa-check-circle",
      variant: "success" as const,
    },
    {
      name: "En Progreso",
      description: "Trabajando actualmente en esta etapa",
      icon: "fa-spinner",
      variant: "primary" as const,
    },
    {
      name: "Pendiente",
      description: "Esta etapa aún no ha comenzado",
      icon: "fa-clock",
      variant: "warning" as const,
      disabled: true,
    },
    {
      name: "Bloqueado",
      description: "Esta etapa está bloqueada",
      icon: "fa-lock",
      variant: "danger" as const,
      disabled: true,
    },
  ];

  const customColorStages = [
    {
      name: "Etapa 1",
      description: "Con color personalizado",
      icon: "fa-star",
      bg: "#8b5cf6",
    },
    {
      name: "Etapa 2",
      description: "Otro color personalizado",
      icon: "fa-heart",
      bg: "#ec4899",
    },
    {
      name: "Etapa 3",
      description: "Verde personalizado",
      icon: "fa-leaf",
      bg: "#10b981",
    },
  ];

  const allVariantsStages = [
    {
      name: "Primary",
      description: "Variante primaria",
      variant: "primary" as const,
    },
    {
      name: "Secondary",
      description: "Variante secundaria",
      variant: "secondary" as const,
    },
    {
      name: "Success",
      description: "Variante de éxito",
      variant: "success" as const,
    },
    {
      name: "Warning",
      description: "Variante de advertencia",
      variant: "warning" as const,
    },
    {
      name: "Danger",
      description: "Variante de peligro",
      variant: "danger" as const,
    },
    {
      name: "Info",
      description: "Variante informativa",
      variant: "info" as const,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="RoadMap - Etapas y Progreso">
        <div className="space-y-8">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso Básico
            </h3>
            <RoadMap stages={basicStages} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente RoadMap muestra una serie de etapas conectadas con líneas.
              Cada etapa tiene un círculo con el color según su variante.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Descripciones
            </h3>
            <RoadMap stages={stagesWithDescriptions} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes agregar descripciones a cada etapa que se mostrarán debajo del
              nombre en un texto más pequeño.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Íconos
            </h3>
            <RoadMap stages={stagesWithIcons} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cada etapa puede tener un ícono FontAwesome 5 que se mostrará dentro del
              círculo. Usa clases como <code>fa-check</code>, <code>fa-code</code>, etc.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Etapas Deshabilitadas
            </h3>
            <RoadMap stages={disabledStages} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Las etapas con <code>disabled: true</code> se muestran con una opacidad de
              0.5, tanto el círculo como el texto (nombre y descripción).
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores Personalizados
            </h3>
            <RoadMap stages={customColorStages} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes usar la propiedad <code>bg</code> para definir un color de fondo
              personalizado (hexadecimal, rgb, o nombre de color). Esto tiene prioridad
              sobre la variante.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Todas las Variantes
            </h3>
            <RoadMap stages={allVariantsStages} />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Las variantes disponibles son: <code>primary</code>,{" "}
              <code>secondary</code>, <code>success</code>, <code>warning</code>,{" "}
              <code>danger</code>, e <code>info</code>. Las líneas conectadoras tienen un
              gradiente que combina 50% del color de la etapa origen y 50% del color de
              la etapa destino.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo Completo
            </h3>
            <RoadMap
              stages={[
                {
                  name: "Inicio del Proyecto",
                  description: "Kickoff y definición de objetivos",
                  icon: "fa-flag",
                  variant: "primary",
                },
                {
                  name: "Desarrollo",
                  description: "Implementación de funcionalidades",
                  icon: "fa-code",
                  variant: "success",
                },
                {
                  name: "Revisión",
                  description: "Code review y testing",
                  icon: "fa-eye",
                  variant: "warning",
                },
                {
                  name: "Despliegue",
                  description: "Publicación en producción",
                  icon: "fa-rocket",
                  variant: "info",
                },
                {
                  name: "Post-Lanzamiento",
                  description: "Monitoreo y mejoras continuas",
                  icon: "fa-chart-line",
                  variant: "secondary",
                },
              ]}
            />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo completo combinando todas las características: variantes, íconos y
              descripciones.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default RoadMapDocs;

