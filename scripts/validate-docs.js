#!/usr/bin/env node

/**
 * Script de Validación de Documentación
 *
 * Este script verifica que toda la documentación esté sincronizada y actualizada
 * correctamente con los componentes y templates de la librería.
 *
 * Uso: node scripts/validate-docs.js
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

const FILES_TO_VALIDATE = [
  "src/index.ts",
  "package.json",
  "README.md",
  "flysoft-ui.config.ts",
  ".cursorrules",
  "docs/component-metadata.json",
  "docs/component-registry.ts",
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
    return null;
  }
};

const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

const getDirectories = (dir) => {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
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
    return [];
  }
};

// ============================================================================
// ESCANEO DE COMPONENTES Y TEMPLATES
// ============================================================================

const scanComponents = () => {
  const components = [];
  const categories = getDirectories(COMPONENTS_DIR);

  categories.forEach((category) => {
    const categoryDir = path.join(COMPONENTS_DIR, category);
    const files = getFiles(categoryDir);

    files.forEach((file) => {
      const componentName = file.replace(".tsx", "");
      components.push({
        name: componentName,
        category,
        file: file,
        path: path.join(categoryDir, file),
      });
    });
  });

  return components;
};

const scanTemplates = () => {
  const templates = [];
  const categories = getDirectories(TEMPLATES_DIR);

  categories.forEach((category) => {
    const categoryDir = path.join(TEMPLATES_DIR, category);
    const files = getFiles(categoryDir);

    files.forEach((file) => {
      const templateName = file.replace(".tsx", "");
      templates.push({
        name: templateName,
        category,
        file: file,
        path: path.join(categoryDir, file),
      });
    });
  });

  return templates;
};

// ============================================================================
// VALIDACIONES
// ============================================================================

const validateFileExists = (filePath, description) => {
  if (fileExists(filePath)) {
    log(`✅ ${description} exists`, "success");
    return true;
  } else {
    log(`❌ ${description} missing: ${filePath}`, "error");
    return false;
  }
};

const validateIndexTs = (components, templates) => {
  log("🔍 Validating src/index.ts...", "info");

  const indexPath = path.join(PROJECT_ROOT, "src", "index.ts");
  const content = readFile(indexPath);

  if (!content) {
    log("❌ src/index.ts not found", "error");
    return false;
  }

  let valid = true;

  // Verificar exports de componentes
  components.forEach((comp) => {
    const exportPattern = new RegExp(
      `export\\s+\\{\\s*${comp.name}\\s*\\}\\s+from`
    );
    const typeExportPattern = new RegExp(
      `export\\s+type\\s+\\{\\s*${comp.name}Props\\s*\\}\\s+from`
    );

    if (!exportPattern.test(content)) {
      log(`❌ Missing export for component ${comp.name}`, "error");
      valid = false;
    } else {
      log(`✅ Component ${comp.name} exported`, "success");
    }

    if (!typeExportPattern.test(content)) {
      log(`❌ Missing type export for ${comp.name}Props`, "error");
      valid = false;
    } else {
      log(`✅ Type ${comp.name}Props exported`, "success");
    }
  });

  // Verificar exports de templates
  templates.forEach((template) => {
    const exportPattern = new RegExp(
      `export\\s+\\{\\s*${template.name}\\s*\\}\\s+from`
    );

    if (!exportPattern.test(content)) {
      log(`❌ Missing export for template ${template.name}`, "error");
      valid = false;
    } else {
      log(`✅ Template ${template.name} exported`, "success");
    }
  });

  return valid;
};

const validatePackageJson = (components, templates) => {
  log("🔍 Validating package.json...", "info");

  const packagePath = path.join(PROJECT_ROOT, "package.json");
  const content = readFile(packagePath);

  if (!content) {
    log("❌ package.json not found", "error");
    return false;
  }

  try {
    const packageJson = JSON.parse(content);
    let valid = true;

    // Verificar campos requeridos
    const requiredFields = ["name", "version", "description", "main", "types"];
    requiredFields.forEach((field) => {
      if (!packageJson[field]) {
        log(`❌ Missing required field: ${field}`, "error");
        valid = false;
      } else {
        log(`✅ Field ${field} present`, "success");
      }
    });

    // Verificar keywords
    if (!packageJson.keywords || !Array.isArray(packageJson.keywords)) {
      log("❌ Missing or invalid keywords field", "error");
      valid = false;
    } else {
      log(
        `✅ Keywords present (${packageJson.keywords.length} items)`,
        "success"
      );
    }

    // Verificar exports
    if (!packageJson.exports) {
      log("❌ Missing exports field", "error");
      valid = false;
    } else {
      log("✅ Exports field present", "success");
    }

    return valid;
  } catch (error) {
    log(`❌ Error parsing package.json: ${error.message}`, "error");
    return false;
  }
};

const validateComponentMetadata = (components, templates) => {
  log("🔍 Validating docs/component-metadata.json...", "info");

  const metadataPath = path.join(DOCS_DIR, "component-metadata.json");
  const content = readFile(metadataPath);

  if (!content) {
    log("❌ component-metadata.json not found", "error");
    return false;
  }

  try {
    const metadata = JSON.parse(content);
    let valid = true;

    // Verificar estructura básica
    if (!metadata.components || !Array.isArray(metadata.components)) {
      log("❌ Invalid components array in metadata", "error");
      valid = false;
    } else {
      log(
        `✅ Components array present (${metadata.components.length} items)`,
        "success"
      );
    }

    if (!metadata.templates || !Array.isArray(metadata.templates)) {
      log("❌ Invalid templates array in metadata", "error");
      valid = false;
    } else {
      log(
        `✅ Templates array present (${metadata.templates.length} items)`,
        "success"
      );
    }

    // Verificar que todos los componentes estén en los metadatos
    components.forEach((comp) => {
      const found = metadata.components.find((c) => c.name === comp.name);
      if (!found) {
        log(`❌ Component ${comp.name} missing from metadata`, "error");
        valid = false;
      } else {
        log(`✅ Component ${comp.name} in metadata`, "success");
      }
    });

    // Verificar que todos los templates estén en los metadatos
    templates.forEach((template) => {
      const found = metadata.templates.find((t) => t.name === template.name);
      if (!found) {
        log(`❌ Template ${template.name} missing from metadata`, "error");
        valid = false;
      } else {
        log(`✅ Template ${template.name} in metadata`, "success");
      }
    });

    return valid;
  } catch (error) {
    log(`❌ Error parsing component-metadata.json: ${error.message}`, "error");
    return false;
  }
};

const validateCursorRules = (components, templates) => {
  log("🔍 Validating .cursorrules...", "info");

  const cursorRulesPath = path.join(PROJECT_ROOT, ".cursorrules");
  const content = readFile(cursorRulesPath);

  if (!content) {
    log("❌ .cursorrules not found", "error");
    return false;
  }

  let valid = true;

  // Verificar que mencione flysoft-react-ui
  if (!content.includes("flysoft-react-ui")) {
    log("❌ .cursorrules does not mention flysoft-react-ui", "error");
    valid = false;
  } else {
    log("✅ .cursorrules mentions flysoft-react-ui", "success");
  }

  // Verificar que mencione componentes principales
  const mainComponents = ["Button", "Input", "Card", "Badge"];
  mainComponents.forEach((comp) => {
    if (!content.includes(comp)) {
      log(`❌ .cursorrules does not mention ${comp}`, "error");
      valid = false;
    } else {
      log(`✅ .cursorrules mentions ${comp}`, "success");
    }
  });

  // Verificar que mencione FontAwesome
  if (!content.includes("FontAwesome")) {
    log("❌ .cursorrules does not mention FontAwesome", "error");
    valid = false;
  } else {
    log("✅ .cursorrules mentions FontAwesome", "success");
  }

  return valid;
};

const validateConfigFile = (components, templates) => {
  log("🔍 Validating flysoft-ui.config.ts...", "info");

  const configPath = path.join(PROJECT_ROOT, "flysoft-ui.config.ts");
  const content = readFile(configPath);

  if (!content) {
    log("❌ flysoft-ui.config.ts not found", "error");
    return false;
  }

  let valid = true;

  // Verificar que exporte COMPONENTS
  if (!content.includes("export const COMPONENTS")) {
    log("❌ flysoft-ui.config.ts does not export COMPONENTS", "error");
    valid = false;
  } else {
    log("✅ flysoft-ui.config.ts exports COMPONENTS", "success");
  }

  // Verificar que exporte TEMPLATES
  if (!content.includes("export const TEMPLATES")) {
    log("❌ flysoft-ui.config.ts does not export TEMPLATES", "error");
    valid = false;
  } else {
    log("✅ flysoft-ui.config.ts exports TEMPLATES", "success");
  }

  // Verificar que exporte THEMES
  if (!content.includes("export const THEMES")) {
    log("❌ flysoft-ui.config.ts does not export THEMES", "error");
    valid = false;
  } else {
    log("✅ flysoft-ui.config.ts exports THEMES", "success");
  }

  return valid;
};

const validateReadme = (components, templates) => {
  log("🔍 Validating README.md...", "info");

  const readmePath = path.join(PROJECT_ROOT, "README.md");
  const content = readFile(readmePath);

  if (!content) {
    log("❌ README.md not found", "error");
    return false;
  }

  let valid = true;

  // Verificar secciones importantes
  const requiredSections = [
    "# Flysoft React UI",
    "## 📦 Instalación",
    "## 🎨 Sistema de Temas",
    "## 📚 Uso",
    "## 🧩 Componentes",
  ];

  requiredSections.forEach((section) => {
    if (!content.includes(section)) {
      log(`❌ README.md missing section: ${section}`, "error");
      valid = false;
    } else {
      log(`✅ README.md has section: ${section}`, "success");
    }
  });

  // Verificar que mencione componentes principales
  const mainComponents = ["Button", "Input", "Card", "Badge"];
  mainComponents.forEach((comp) => {
    if (!content.includes(comp)) {
      log(`❌ README.md does not mention ${comp}`, "error");
      valid = false;
    } else {
      log(`✅ README.md mentions ${comp}`, "success");
    }
  });

  return valid;
};

const validateComponentRegistry = (components, templates) => {
  log("🔍 Validating docs/component-registry.ts...", "info");

  const registryPath = path.join(DOCS_DIR, "component-registry.ts");
  const content = readFile(registryPath);

  if (!content) {
    log("❌ component-registry.ts not found", "error");
    return false;
  }

  let valid = true;

  // Verificar que exporte COMPONENT_REGISTRY
  if (!content.includes("export const COMPONENT_REGISTRY")) {
    log("❌ component-registry.ts does not export COMPONENT_REGISTRY", "error");
    valid = false;
  } else {
    log("✅ component-registry.ts exports COMPONENT_REGISTRY", "success");
  }

  // Verificar que exporte TEMPLATE_REGISTRY
  if (!content.includes("export const TEMPLATE_REGISTRY")) {
    log("❌ component-registry.ts does not export TEMPLATE_REGISTRY", "error");
    valid = false;
  } else {
    log("✅ component-registry.ts exports TEMPLATE_REGISTRY", "success");
  }

  return valid;
};

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

const main = () => {
  log("🚀 Starting documentation validation...", "info");

  try {
    // Escanear componentes y templates
    const components = scanComponents();
    const templates = scanTemplates();

    log(
      `📊 Found ${components.length} components and ${templates.length} templates`,
      "info"
    );

    if (components.length === 0 && templates.length === 0) {
      log("⚠️  No components or templates found", "warning");
    }

    let allValid = true;

    // Validar archivos requeridos
    FILES_TO_VALIDATE.forEach((file) => {
      const filePath = path.join(PROJECT_ROOT, file);
      if (!validateFileExists(filePath, file)) {
        allValid = false;
      }
    });

    // Validaciones específicas
    if (!validateIndexTs(components, templates)) allValid = false;
    if (!validatePackageJson(components, templates)) allValid = false;
    if (!validateComponentMetadata(components, templates)) allValid = false;
    if (!validateCursorRules(components, templates)) allValid = false;
    if (!validateConfigFile(components, templates)) allValid = false;
    if (!validateReadme(components, templates)) allValid = false;
    if (!validateComponentRegistry(components, templates)) allValid = false;

    // Resultado final
    if (allValid) {
      log(
        "✅ All validations passed! Documentation is synchronized.",
        "success"
      );
      process.exit(0);
    } else {
      log("❌ Some validations failed. Please fix the issues above.", "error");
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Error during validation: ${error.message}`, "error");
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
  validateIndexTs,
  validatePackageJson,
  validateComponentMetadata,
  validateCursorRules,
  validateConfigFile,
  validateReadme,
  validateComponentRegistry,
};
