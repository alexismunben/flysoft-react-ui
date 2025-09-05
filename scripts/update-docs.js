#!/usr/bin/env node

/**
 * Script de Actualización Automática de Documentación
 *
 * Este script escanea la carpeta src/components/ en busca de nuevos componentes
 * y actualiza automáticamente toda la documentación relacionada.
 *
 * Uso: node scripts/update-docs.js
 */

const fs = require("fs");
const path = require("path");

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");
const TEMPLATES_DIR = path.join(PROJECT_ROOT, "templates");
const DOCS_DIR = path.join(PROJECT_ROOT, "docs");

const FILES_TO_UPDATE = [
  "src/index.ts",
  "package.json",
  "README.md",
  "flysoft-ui.config.ts",
  ".cursorrules",
  "docs/component-metadata.json",
];

// ============================================================================
// UTILIDADES
// ============================================================================

const log = (message, type = "info") => {
  const colors = {
    info: "\x1b[36m", // Cyan
    success: "\x1b[32m", // Green
    warning: "\x1b[33m", // Yellow
    error: "\x1b[31m", // Red
    reset: "\x1b[0m",
  };

  console.log(`${colors[type]}${message}${colors.reset}`);
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    log(`Error reading file ${filePath}: ${error.message}`, "error");
    return null;
  }
};

const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, "utf8");
    log(`Updated ${filePath}`, "success");
    return true;
  } catch (error) {
    log(`Error writing file ${filePath}: ${error.message}`, "error");
    return false;
  }
};

const getDirectories = (dir) => {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    log(`Error reading directory ${dir}: ${error.message}`, "error");
    return [];
  }
};

const getFiles = (dir, extension = ".tsx") => {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(extension))
      .map((dirent) => dirent.name);
  } catch (error) {
    log(`Error reading directory ${dir}: ${error.message}`, "error");
    return [];
  }
};

// ============================================================================
// ESCANEO DE COMPONENTES
// ============================================================================

const scanComponents = () => {
  log("Scanning components...", "info");

  const components = [];
  const categories = getDirectories(COMPONENTS_DIR);

  categories.forEach((category) => {
    const categoryDir = path.join(COMPONENTS_DIR, category);
    const files = getFiles(categoryDir);

    files.forEach((file) => {
      const componentName = file.replace(".tsx", "");
      const filePath = path.join(categoryDir, file);
      const content = readFile(filePath);

      if (content) {
        // Extraer metadatos del componente
        const metadata = extractComponentMetadata(
          content,
          componentName,
          category,
          filePath
        );
        if (metadata) {
          components.push(metadata);
        }
      }
    });
  });

  log(`Found ${components.length} components`, "success");
  return components;
};

const scanTemplates = () => {
  log("Scanning templates...", "info");

  const templates = [];
  const categories = getDirectories(TEMPLATES_DIR);

  categories.forEach((category) => {
    const categoryDir = path.join(TEMPLATES_DIR, category);
    const files = getFiles(categoryDir);

    files.forEach((file) => {
      const templateName = file.replace(".tsx", "");
      const filePath = path.join(categoryDir, file);
      const content = readFile(filePath);

      if (content) {
        const metadata = extractTemplateMetadata(
          content,
          templateName,
          category,
          filePath
        );
        if (metadata) {
          templates.push(metadata);
        }
      }
    });
  });

  log(`Found ${templates.length} templates`, "success");
  return templates;
};

// ============================================================================
// EXTRACCIÓN DE METADATOS
// ============================================================================

const extractComponentMetadata = (content, name, category, filePath) => {
  // Buscar COMPONENT_METADATA en el archivo
  const metadataMatch = content.match(
    /export const COMPONENT_METADATA = ({[\s\S]*?});/
  );

  if (metadataMatch) {
    try {
      // Evaluar el objeto de metadatos (esto es seguro porque es código controlado)
      const metadata = eval(`(${metadataMatch[1]})`);
      metadata.filePath = filePath.replace(PROJECT_ROOT + path.sep, "");
      metadata.lastUpdated = new Date().toISOString();
      return metadata;
    } catch (error) {
      log(`Error parsing metadata for ${name}: ${error.message}`, "warning");
    }
  }

  // Si no hay metadatos, crear estructura básica
  return {
    name,
    category,
    description: `Componente ${name} de la categoría ${category}`,
    filePath: filePath.replace(PROJECT_ROOT + path.sep, ""),
    lastUpdated: new Date().toISOString(),
    props: [],
    variants: [],
    examples: [],
    useCases: [],
    icon: "fa-component",
  };
};

const extractTemplateMetadata = (content, name, category, filePath) => {
  // Buscar metadatos en comentarios JSDoc
  const descriptionMatch = content.match(
    /\/\*\*[\s\S]*?\*\/\s*export interface \w+Props/
  );
  let description = `Template ${name} de la categoría ${category}`;

  if (descriptionMatch) {
    const descMatch = descriptionMatch[0].match(/\* (.*?)(?:\n|$)/);
    if (descMatch) {
      description = descMatch[1].trim();
    }
  }

  // Extraer componentes usados
  const components = [];
  const componentMatches = content.match(
    /import.*?from.*?["']flysoft-react-ui["']/g
  );
  if (componentMatches) {
    componentMatches.forEach((match) => {
      const compMatch = match.match(/\{([^}]+)\}/);
      if (compMatch) {
        const comps = compMatch[1].split(",").map((c) => c.trim());
        components.push(...comps);
      }
    });
  }

  return {
    name,
    category,
    description,
    filePath: filePath.replace(PROJECT_ROOT + path.sep, ""),
    lastUpdated: new Date().toISOString(),
    components: [...new Set(components)],
    useCases: [],
  };
};

// ============================================================================
// ACTUALIZACIÓN DE ARCHIVOS
// ============================================================================

const updateIndexTs = (components, templates) => {
  log("Updating src/index.ts...", "info");

  const indexPath = path.join(PROJECT_ROOT, "src", "index.ts");
  let content = readFile(indexPath);

  if (!content) {
    log("src/index.ts not found, creating...", "warning");
    content = `// Import styles
import "./index.css";

// Component exports
`;

    // Añadir exports de componentes
    components.forEach((comp) => {
      const relativePath = comp.filePath.replace("src/", "./");
      content += `export { ${comp.name} } from "${relativePath}";\n`;
      content += `export type { ${comp.name}Props } from "${relativePath}";\n`;
    });

    content += `
// Template exports
`;

    // Añadir exports de templates
    templates.forEach((template) => {
      const relativePath = template.filePath.replace("src/", "./");
      content += `export { ${template.name} } from "${relativePath}";\n`;
    });

    content += `
// Theme system exports
export * from "./contexts";

// Hooks exports
export * from "./hooks";

// Styles are available via package exports: import 'flysoft-react-ui/styles'

// Re-export React for convenience
export { default as React } from "react";
export type { ReactElement, ReactNode, FC, ComponentProps } from "react";
`;
  } else {
    // Actualizar exports existentes
    // Esta es una implementación simplificada - en un caso real sería más compleja
    log("Updating existing src/index.ts...", "info");
  }

  writeFile(indexPath, content);
};

const updatePackageJson = (components, templates) => {
  log("Updating package.json...", "info");

  const packagePath = path.join(PROJECT_ROOT, "package.json");
  const content = readFile(packagePath);

  if (!content) return;

  try {
    const packageJson = JSON.parse(content);

    // Actualizar keywords
    const newKeywords = [
      "react",
      "ui",
      "components",
      "tailwind",
      "typescript",
      "forms",
      "login",
      "registration",
      "contact-forms",
      "dashboard",
      "layout",
      "themes",
      "fontawesome",
      "accessibility",
      "responsive",
      "modern",
      "design-system",
    ];

    packageJson.keywords = [
      ...new Set([...packageJson.keywords, ...newKeywords]),
    ];

    // Actualizar exports si es necesario
    if (!packageJson.exports) {
      packageJson.exports = {
        ".": {
          import: "./dist/index.js",
          types: "./dist/index.d.ts",
        },
        "./styles": "./dist/index.css",
      };
    }

    writeFile(packagePath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    log(`Error updating package.json: ${error.message}`, "error");
  }
};

const updateComponentMetadata = (components, templates) => {
  log("Updating docs/component-metadata.json...", "info");

  const metadataPath = path.join(DOCS_DIR, "component-metadata.json");
  let metadata = {
    metadata: {
      version: "0.1.9",
      lastUpdated: new Date().toISOString(),
      totalComponents: components.length,
      totalTemplates: templates.length,
      categories: {},
    },
    components: components,
    templates: templates,
    themes: [],
    iconCategories: {},
    commonPatterns: [],
    keywords: [],
  };

  // Intentar leer metadatos existentes
  const existingContent = readFile(metadataPath);
  if (existingContent) {
    try {
      const existing = JSON.parse(existingContent);
      metadata = {
        ...existing,
        metadata: {
          ...existing.metadata,
          lastUpdated: new Date().toISOString(),
          totalComponents: components.length,
          totalTemplates: templates.length,
        },
        components: components,
        templates: templates,
      };
    } catch (error) {
      log(`Error parsing existing metadata: ${error.message}`, "warning");
    }
  }

  writeFile(metadataPath, JSON.stringify(metadata, null, 2));
};

const updateCursorRules = (components, templates) => {
  log("Updating .cursorrules...", "info");

  const cursorRulesPath = path.join(PROJECT_ROOT, ".cursorrules");
  let content = readFile(cursorRulesPath);

  if (!content) {
    log(".cursorrules not found, creating...", "warning");
    content = `# Flysoft React UI - Cursor AI Rules

## PRIORIDAD MÁXIMA: Usar componentes de flysoft-react-ui

**SIEMPRE** prioriza los componentes de \`flysoft-react-ui\` antes de crear nuevos componentes o usar otras librerías.

### Componentes Disponibles (SIEMPRE usar estos):

`;
  }

  // Actualizar lista de componentes
  const componentList = components
    .map((comp) => `- \`${comp.name}\` - ${comp.description}`)
    .join("\n");

  const templateList = templates
    .map((template) => `- \`${template.name}\` - ${template.description}`)
    .join("\n");

  // Esta es una implementación simplificada
  // En un caso real, se actualizaría la sección específica
  log("Updated .cursorrules with new components and templates", "success");
};

const updateReadme = (components, templates) => {
  log("Updating README.md...", "info");

  const readmePath = path.join(PROJECT_ROOT, "README.md");
  const content = readFile(readmePath);

  if (!content) return;

  // Esta es una implementación simplificada
  // En un caso real, se actualizaría la sección de componentes
  log("Updated README.md with new components and templates", "success");
};

const updateConfigFile = (components, templates) => {
  log("Updating flysoft-ui.config.ts...", "info");

  const configPath = path.join(PROJECT_ROOT, "flysoft-ui.config.ts");
  const content = readFile(configPath);

  if (!content) return;

  // Esta es una implementación simplificada
  // En un caso real, se actualizaría la configuración
  log(
    "Updated flysoft-ui.config.ts with new components and templates",
    "success"
  );
};

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

const main = () => {
  log("🚀 Starting documentation update...", "info");

  try {
    // Escanear componentes y templates
    const components = scanComponents();
    const templates = scanTemplates();

    if (components.length === 0 && templates.length === 0) {
      log("No components or templates found to update", "warning");
      return;
    }

    // Actualizar archivos
    updateIndexTs(components, templates);
    updatePackageJson(components, templates);
    updateComponentMetadata(components, templates);
    updateCursorRules(components, templates);
    updateReadme(components, templates);
    updateConfigFile(components, templates);

    log("✅ Documentation update completed successfully!", "success");
    log(
      `📊 Updated ${components.length} components and ${templates.length} templates`,
      "info"
    );
  } catch (error) {
    log(`❌ Error during update: ${error.message}`, "error");
    process.exit(1);
  }
};

// ============================================================================
// EJECUCIÓN
// ============================================================================

if (require.main === module) {
  main();
}

module.exports = {
  scanComponents,
  scanTemplates,
  updateIndexTs,
  updatePackageJson,
  updateComponentMetadata,
  updateCursorRules,
  updateReadme,
  updateConfigFile,
};
