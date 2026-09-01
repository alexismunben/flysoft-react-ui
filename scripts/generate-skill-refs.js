#!/usr/bin/env node

/**
 * Generador de la referencia de API de la skill `flysoft-ui`.
 *
 * Produce `claude/skills/flysoft-ui/references/*.md` leyendo los tipos de
 * `src/` con la API del compilador de TypeScript. Nadie edita esos archivos a
 * mano: si una tabla está mal, está mal el tipo.
 *
 * Decisiones que explican por qué esto no usa una herramienta de estante:
 *
 * - Se emiten SOLO las props declaradas en cada interfaz (`decl.members`), no
 *   las resueltas por el checker. `SearchSelectInputProps` declara 14 props y
 *   resuelve 322 al heredar `HTMLAttributes`; una tabla con las 322 es basura.
 * - El tipo de cada prop se toma como TEXTO FUENTE (`member.type.getText()`).
 *   `checker.typeToString()` colapsa `"tight" | "sm" | "md" | "lg" | string`
 *   a `string`, que es justo el error que tenía la doc escrita a mano.
 * - Los defaults no están en los tipos (no hay un solo `@default` en el repo):
 *   se extraen del destructuring de los `.tsx`.
 *
 * Uso:
 *   node scripts/generate-skill-refs.js           escribe los archivos
 *   node scripts/generate-skill-refs.js --check   falla si están desactualizados
 *   node scripts/generate-skill-refs.js --strict  convierte los avisos en error
 */

import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = path.join(ROOT, "src", "index.ts");
const OUT_DIR = path.join(ROOT, "claude", "skills", "flysoft-ui", "references");
const CSS_FILE = path.join(ROOT, "src", "index.css");

const CHECK = process.argv.includes("--check");
const STRICT = process.argv.includes("--strict");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

/* ------------------------------------------------------------------ *
 * Configuración: a qué archivo va cada cosa
 * ------------------------------------------------------------------ */

const FAMILIES = {
  forms: {
    title: "Componentes de formulario",
    intro:
      "Controles de entrada. Todos se importan desde `'flysoft-react-ui'`.\n\n" +
      "Los que declaran `extends` heredan además todos los atributos nativos del " +
      "elemento HTML correspondiente (`onFocus`, `placeholder`, `name`, `required`, " +
      "etc.); acá sólo se listan las props propias de la librería.",
  },
  display: {
    title: "Componentes de display",
    intro: "Componentes de presentación de datos, estado y avatares.",
  },
  layout: {
    title: "Layout, overlay y navegación",
    intro:
      "Estructura de página, contenedores, modales, menús y filtros.",
  },
  hooks: {
    title: "Providers, hooks y context types",
    intro:
      "Los providers montan el contexto; los hooks lo leen. Para cada hook se " +
      "incluye la forma de lo que devuelve, porque es la mitad de su API.",
  },
  services: {
    title: "apiClient, helpers e interfaces",
    intro: "Cliente HTTP, funciones utilitarias y las interfaces compartidas.",
  },
  templates: {
    title: "Templates",
    intro:
      "Componentes de página pre-armados. Resuelven un caso completo; si necesitás " +
      "desviarte del caso, componé con los de `layout` y `forms` en vez de peleárselo.",
  },
  theming: {
    title: "Tema, densidad y variables CSS",
    intro:
      "Los nombres de las variables CSS salen del bloque `@theme` de `src/index.css` " +
      "y de los mapas de tokens de `src/contexts/`, no de los tipos.",
  },
};

/**
 * Componentes en orden de aparición. Este mapa es el contrato: un componente
 * exportado que no esté acá rompe el build.
 */
const COMPONENTS = {
  forms: [
    "Button",
    "LinkButton",
    "Input",
    "AutocompleteInput",
    "SearchSelectInput",
    "DateInput",
    "DatePicker",
    "Checkbox",
    "RadioButtonGroup",
    "CurrencyInput",
    "Pagination",
  ],
  display: [
    "DataTable",
    "DataField",
    "Badge",
    "Avatar",
    "RoadMap",
    "Loader",
    "Skeleton",
    "ThemeSwitcher",
  ],
  layout: [
    "AppLayout",
    "Card",
    "Collection",
    "Accordion",
    "TabsGroup",
    "TabPanel",
    "Menu",
    "DropdownMenu",
    "DropdownPanel",
    "Filter",
    "FiltersDialog",
    "Dialog",
    "Snackbar",
    "SnackbarContainer",
  ],
  hooks: [
    "ThemeProvider",
    "AppLayoutProvider",
    "AuthProvider",
    "CrudProvider",
    "SnackbarProvider",
  ],
  templates: [
    "LoginForm",
    "RegistrationForm",
    "ContactForm",
    "DashboardLayout",
    "SidebarLayout",
    "FormPattern",
    "ListPattern",
  ],
};

/** Componentes sin props. Sin esta lista, el generador los reportaría como sin tipar. */
const NO_PROPS = new Set(["ThemeSwitcher"]);

/** Overrides por símbolo, cuando no corresponde seguir a su archivo fuente. */
const SYMBOL_PLACEMENT = {
  Theme: "theming",
  Density: "theming",
  DensityTokens: "theming",
  ThemeOverride: "theming",
  ThemeContextType: "hooks",
  NavbarInterface: "layout",
  LeftDrawerInterface: "layout",
};

/** Fallback por prefijo de path, para archivos que no declaran ningún componente. */
const PATH_PLACEMENT = [
  ["src/contexts/types.ts", "theming"],
  ["src/contexts/presets.ts", "theming"],
  ["src/contexts/", "hooks"],
  ["src/hooks/", "hooks"],
  ["src/services/", "services"],
  ["src/helpers/", "services"],
  ["src/interfaces/", "services"],
  ["src/components/form-controls/", "forms"],
  ["src/components/layout/", "layout"],
  ["src/components/utils/", "layout"],
  ["src/templates/", "templates"],
];

/** Re-exports de React: no son superficie de esta librería. */
const SKIP = new Set(["React", "ReactElement", "ReactNode", "FC", "ComponentProps"]);

const warnings = [];
const errors = [];

/* ------------------------------------------------------------------ *
 * Programa de TypeScript
 * ------------------------------------------------------------------ */

const program = ts.createProgram([ENTRY], {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  skipLibCheck: true,
  strict: true,
  allowJs: false,
  noEmit: true,
});
const checker = program.getTypeChecker();

const entrySource = program.getSourceFile(ENTRY);
if (!entrySource) {
  console.error(`No se pudo abrir ${ENTRY}`);
  process.exit(1);
}
const moduleSymbol = checker.getSymbolAtLocation(entrySource);
const exportedSymbols = checker.getExportsOfModule(moduleSymbol);

const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");

/* ------------------------------------------------------------------ *
 * Utilidades de AST
 * ------------------------------------------------------------------ */

function unalias(sym) {
  return sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
}

function declOf(sym) {
  const decls = unalias(sym).getDeclarations();
  return decls && decls.length ? decls[0] : undefined;
}

/** Texto de un nodo de tipo, normalizado a una línea. */
function typeText(node) {
  if (!node) return "unknown";
  return node
    .getText()
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/,?\s+\)/g, ")")
    .trim();
}

/**
 * Índice de type aliases de todo `src/`, para poder inlinear los que son
 * uniones de literales. `gap: CollectionGap` no le sirve a nadie si hay que
 * saltar a otra sección para ver los cuatro valores posibles.
 */
const typeAliasIndex = new Map();
for (const sf of program.getSourceFiles()) {
  if (sf.isDeclarationFile) continue;
  const visit = (node) => {
    if (ts.isTypeAliasDeclaration(node) && node.name) {
      typeAliasIndex.set(node.name.text, node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

/** ¿Es una unión de literales y/o keywords primitivos? */
function isLiteralUnion(typeNode) {
  if (!typeNode || !ts.isUnionTypeNode(typeNode)) return false;
  return typeNode.types.every(
    (t) =>
      (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) ||
      t.kind === ts.SyntaxKind.StringKeyword ||
      t.kind === ts.SyntaxKind.NumberKeyword
  );
}

/**
 * Expande un alias que sea unión de literales. Devuelve el texto a mostrar en
 * la tabla, con el nombre del alias entre paréntesis para no perder la pista.
 */
function expandedTypeText(typeNode) {
  const text = typeText(typeNode);
  if (!typeNode || !ts.isTypeReferenceNode(typeNode) || typeNode.typeArguments) return text;
  const alias = typeAliasIndex.get(text);
  if (!alias || !isLiteralUnion(alias.type)) return text;
  return `${typeText(alias.type)}  (${text})`;
}

/** Escapa para una celda de tabla markdown. */
function cell(text) {
  return text.replace(/\|/g, "\\|");
}

/** Descripción TSDoc de un nodo con nombre, en una línea. */
function docOf(node) {
  if (!node || !node.name) return "";
  const sym = checker.getSymbolAtLocation(node.name);
  if (!sym) return "";
  return ts
    .displayPartsToString(sym.getDocumentationComment(checker))
    .replace(/\s+/g, " ")
    .trim();
}

/** Bloques `@example` de un nodo con nombre. */
function examplesOf(node) {
  if (!node || !node.name) return [];
  const sym = checker.getSymbolAtLocation(node.name);
  if (!sym) return [];
  return sym
    .getJsDocTags(checker)
    .filter((t) => t.name === "example")
    .map((t) => ts.displayPartsToString(t.text || []).trim())
    .filter(Boolean);
}

/** Busca una declaración por nombre dentro de un archivo (exportada o no). */
function findLocalDeclaration(sourceFile, name) {
  let found;
  const visit = (node) => {
    if (found) return;
    if (
      (ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isClassDeclaration(node)) &&
      node.name &&
      node.name.text === name
    ) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

/* ------------------------------------------------------------------ *
 * Defaults: se extraen del destructuring de los .tsx
 * ------------------------------------------------------------------ */

function collectDefaults() {
  const index = new Map();

  const record = (name, params) => {
    if (!name || !params.length) return;
    const p0 = params[0];
    if (!p0.name || !ts.isObjectBindingPattern(p0.name)) return;
    const defaults = new Map();
    for (const el of p0.name.elements) {
      if (el.initializer) {
        defaults.set(
          el.name.getText(),
          el.initializer.getText().replace(/\s+/g, " ").trim()
        );
      }
    }
    if (defaults.size) index.set(name, defaults);
  };

  for (const sf of program.getSourceFiles()) {
    if (sf.isDeclarationFile) continue;
    if (!rel(sf.fileName).startsWith("src/")) continue;

    const visit = (node) => {
      if (ts.isVariableDeclaration(node) && node.initializer) {
        // Desenvuelve React.forwardRef(...) / memo(...)
        let fn = node.initializer;
        while (ts.isCallExpression(fn) && fn.arguments.length) fn = fn.arguments[0];
        if (
          (ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) &&
          fn.parameters.length
        ) {
          record(node.name.getText(), fn.parameters);
        }
      }
      if (ts.isFunctionDeclaration(node) && node.name) {
        record(node.name.text, node.parameters);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return index;
}

const defaultsIndex = collectDefaults();

/**
 * Los componentes envueltos en forwardRef declaran los defaults en una función
 * interna (`InputInner`, `AutocompleteInputInner`).
 */
function defaultsFor(componentName) {
  return (
    defaultsIndex.get(componentName) ||
    defaultsIndex.get(`${componentName}Inner`) ||
    new Map()
  );
}

/* ------------------------------------------------------------------ *
 * Render de interfaces
 * ------------------------------------------------------------------ */

const PROPS_HEADER =
  "| Prop | Tipo | Req. | Default | Descripción |\n|---|---|---|---|---|";

function ownMembers(decl) {
  if (!decl.members) return [];
  return decl.members.filter(
    (m) => (ts.isPropertySignature(m) || ts.isMethodSignature(m)) && m.name
  );
}

function heritageText(decl) {
  if (!decl.heritageClauses) return "";
  return decl.heritageClauses
    .flatMap((h) => h.types.map((t) => typeText(t)))
    .join(", ");
}

/**
 * Default declarado con `@default` en el TSDoc. Es la única forma de expresar
 * un default que se resuelve en el cuerpo del componente y no en el
 * destructuring (p. ej. `Collection.gap`, que pasa por `resolveGap()`).
 */
function declaredDefault(member) {
  const tags = ts.getJSDocTags(member);
  for (const tag of tags) {
    if (tag.tagName.text !== "default") continue;
    const text =
      typeof tag.comment === "string"
        ? tag.comment
        : ts.displayPartsToString(tag.comment || []);
    const value = text.replace(/\s+/g, " ").trim();
    if (value) return value;
  }
  return undefined;
}

function renderMembersTable(decl, defaults = new Map(), skipNames = new Set()) {
  const members = ownMembers(decl).filter((m) => !skipNames.has(m.name.getText()));
  if (!members.length) return "";
  const rows = members.map((m) => {
    const name = m.name.getText();
    const optional = !!m.questionToken;
    const type = ts.isMethodSignature(m)
      ? `(${m.parameters.map((p) => typeText(p)).join(", ")}) => ${typeText(m.type)}`
      : expandedTypeText(m.type);
    // `@default` gana sobre el destructuring: es explícito.
    const raw = declaredDefault(m) || defaults.get(name);
    const def = raw ? `\`${raw}\`` : "—";
    return `| \`${name}\` | \`${cell(type)}\` | ${optional ? "" : "**sí**"} | ${cell(def)} | ${cell(docOf(m))} |`;
  });
  return [PROPS_HEADER, ...rows].join("\n");
}

/** Una interfaz puede ser sólo una index signature (`{ [k: string]: T }`). */
function indexSignatureText(decl) {
  if (!decl.members) return "";
  const sigs = decl.members.filter(ts.isIndexSignatureDeclaration);
  if (!sigs.length) return "";
  return sigs.map((s) => typeText(s)).join("\n");
}

/** Interfaz suelta (no props de componente): tabla de sus miembros. */
function renderInterface(decl, name) {
  const out = [`### \`${name}\``];
  const doc = docOf(decl);
  if (doc) out.push("", doc);
  const ext = heritageText(decl);
  if (ext) out.push("", `Extiende \`${cell(ext)}\`.`);
  const table = renderMembersTable(decl);
  const indexSig = indexSignatureText(decl);
  if (table) out.push("", table);
  if (indexSig) out.push("", "```ts\n" + `interface ${name} { ${indexSig} }` + "\n```");
  if (!table && !indexSig && !ext) {
    errors.push(`\`${name}\` es una interfaz sin miembros ni \`extends\`.`);
  }
  return out.join("\n");
}

/* ------------------------------------------------------------------ *
 * Render de componentes
 * ------------------------------------------------------------------ */

/** Resuelve la declaración de `XProps`, exportada o local al archivo del componente. */
function resolvePropsDecl(componentName, componentDecl) {
  const propsName = `${componentName}Props`;
  const exported = exportedSymbols.find((s) => s.getName() === propsName);
  if (exported) {
    const d = declOf(exported);
    if (d) return { decl: d, name: propsName, exported: true };
  }
  const sf = componentDecl.getSourceFile();
  const local = findLocalDeclaration(sf, propsName);
  if (local) return { decl: local, name: propsName, exported: false };
  return undefined;
}

/**
 * `FilterProps` es una unión discriminada por `filterType`. Una tabla plana la
 * miente: se emite la base compartida y después cada variante.
 */
function renderUnionProps(aliasDecl, sourceFile) {
  const members = aliasDecl.type.types || [];
  const variantDecls = members
    .map((t) => {
      const name = typeText(t).replace(/<.*$/, "");
      return { name, decl: findLocalDeclaration(sourceFile, name) };
    })
    .filter((v) => v.decl);

  if (!variantDecls.length) return "";

  // Base compartida: si todas las variantes extienden lo mismo, se emite una vez.
  const bases = new Set(variantDecls.map((v) => heritageText(v.decl)));
  const out = [];
  if (bases.size === 1) {
    const baseName = [...bases][0].replace(/<.*$/, "");
    const baseDecl = findLocalDeclaration(sourceFile, baseName);
    if (baseDecl) {
      out.push(`**Props base** (comunes a todas las variantes):`, "");
      out.push(renderMembersTable(baseDecl));
      out.push("");
    }
  }
  out.push(
    `Después, según \`filterType\` — la unión es discriminada, así que el tipo exige las props de su variante:`,
    ""
  );
  for (const v of variantDecls) {
    const discriminant = ownMembers(v.decl).find(
      (m) => m.name.getText() === "filterType"
    );
    const label = discriminant ? typeText(discriminant.type) : v.name;
    const extra = renderMembersTable(v.decl, new Map(), new Set(["filterType"]));
    out.push(`**\`filterType: ${label}\`**`);
    out.push("");
    out.push(extra || "Sólo las props base.");
    out.push("");
  }
  return out.join("\n").trimEnd();
}

function renderComponent(name) {
  const sym = exportedSymbols.find((s) => s.getName() === name);
  if (!sym) {
    errors.push(`\`${name}\` está en el mapa COMPONENTS pero no lo exporta src/index.ts.`);
    return "";
  }
  const decl = declOf(sym);
  if (!decl) {
    errors.push(`\`${name}\` no tiene declaración resoluble.`);
    return "";
  }

  const out = [`## ${name}`];
  const doc = docOf(decl);
  if (doc) out.push("", doc);

  if (NO_PROPS.has(name)) {
    out.push("", "Sin props.");
    return out.join("\n");
  }

  const props = resolvePropsDecl(name, decl);
  if (!props) {
    errors.push(
      `\`${name}\` no tiene una interfaz \`${name}Props\` resoluble. ` +
        `Si es intencional, agregalo a NO_PROPS en scripts/generate-skill-refs.js.`
    );
    return "";
  }

  const sf = props.decl.getSourceFile();
  const typeParams = (props.decl.typeParameters || []).map((tp) => tp.getText());
  if (typeParams.length) {
    out[0] = `## ${name}\\<${typeParams.map((t) => t.split(" ")[0]).join(", ")}\\>`;
    const unconstrained = (props.decl.typeParameters || [])
      .filter((tp) => !tp.constraint)
      .map((tp) => tp.name.text);
    if (unconstrained.length) {
      warnings.push(
        `${name}: genérico(s) sin restringir (${unconstrained.join(", ")}) — ` +
          `el tipo no expresa qué forma debe tener. Documentar el contrato en patterns.md.`
      );
    }
  }

  if (ts.isTypeAliasDeclaration(props.decl) && ts.isUnionTypeNode(props.decl.type)) {
    out.push("", renderUnionProps(props.decl, sf));
  } else {
    const ext = heritageText(props.decl);
    if (ext) out.push("", `Extiende \`${cell(ext)}\` — hereda además sus atributos nativos.`);
    const table = renderMembersTable(props.decl, defaultsFor(name));
    if (table) {
      out.push("", table);
    } else if (!ext) {
      errors.push(`\`${name}Props\` no declara ninguna prop y no extiende nada.`);
      return "";
    }
  }

  // `any` en una prop pública es un agujero real, no ruido heredado.
  for (const m of ownMembers(props.decl)) {
    if (/\bany\b/.test(typeText(m.type))) {
      warnings.push(
        `${name}.${m.name.getText()} está tipado con \`any\` — la tabla no puede describirlo.`
      );
    }
  }

  for (const ex of examplesOf(decl)) {
    out.push("", ex.startsWith("```") ? ex : "```tsx\n" + ex + "\n```");
  }
  return out.join("\n");
}

/* ------------------------------------------------------------------ *
 * Render de funciones, hooks, clases y constantes
 * ------------------------------------------------------------------ */

function signatureOf(sym, decl) {
  const type = checker.getTypeOfSymbolAtLocation(unalias(sym), decl);
  return checker
    .typeToString(type, decl, ts.TypeFormatFlags.NoTruncation)
    .replace(/\s+/g, " ")
    .trim();
}

function renderFunction(sym, name) {
  const decl = declOf(sym);
  const out = [`### \`${name}\``];
  const doc = docOf(decl);
  if (doc) out.push("", doc);
  out.push("", "```ts\n" + `${name}: ${signatureOf(sym, decl)}` + "\n```");
  for (const ex of examplesOf(decl)) {
    out.push("", ex.startsWith("```") ? ex : "```tsx\n" + ex + "\n```");
  }
  return out.join("\n");
}

/** `apiClient` es la instancia de una clase: se emiten sus métodos públicos. */
function renderClassInstance(sym, name) {
  const decl = declOf(sym);
  const type = checker.getTypeOfSymbolAtLocation(unalias(sym), decl);
  const classDecl = type.getSymbol() && declOf(type.getSymbol());
  if (!classDecl || !classDecl.members) return renderFunction(sym, name);

  const out = [`### \`${name}\``];
  const doc = docOf(classDecl);
  if (doc) out.push("", doc);

  const referenced = new Set();
  const lines = [];
  for (const m of classDecl.members) {
    if (!ts.isMethodDeclaration(m) || !m.name) continue;
    const isPrivate = (m.modifiers || []).some(
      (mod) => mod.kind === ts.SyntaxKind.PrivateKeyword
    );
    if (isPrivate) continue;
    const tp = m.typeParameters ? `<${m.typeParameters.map((t) => t.getText()).join(", ")}>` : "";
    const params = m.parameters.map((p) => typeText(p));
    for (const p of m.parameters) {
      if (p.type) {
        const n = typeText(p.type).replace(/<.*$/, "");
        if (/^[A-Z]/.test(n)) referenced.add(n);
      }
    }
    lines.push(
      `| \`${m.name.getText()}${tp}(${cell(params.join(", "))})\` | \`${cell(typeText(m.type))}\` | ${cell(docOf(m))} |`
    );
  }
  out.push("", "| Método | Devuelve | Descripción |\n|---|---|---|", lines.join("\n"));

  const sf = classDecl.getSourceFile();
  const shapes = [...referenced]
    .sort()
    .map((n) => ({ n, d: findLocalDeclaration(sf, n) }))
    .filter((s) => s.d && s.d.members);
  if (shapes.length) {
    out.push("", "**Formas de los parámetros**", "");
    for (const s of shapes) {
      const table = renderMembersTable(s.d);
      if (table) out.push(`\`${s.n}\``, "", table, "");
    }
  }
  return out.join("\n").trimEnd();
}

function renderTypeAlias(decl, name) {
  const out = [`### \`${name}\``];
  const doc = docOf(decl);
  if (doc) out.push("", doc);
  out.push("", "```ts\n" + `type ${name} = ${typeText(decl.type)}` + "\n```");
  return out.join("\n");
}

function renderSymbol(sym) {
  const name = sym.getName();
  const decl = declOf(sym);
  if (!decl) {
    errors.push(`\`${name}\` está exportado pero no tiene declaración resoluble.`);
    return "";
  }
  if (ts.isInterfaceDeclaration(decl)) return renderInterface(decl, name);
  if (ts.isTypeAliasDeclaration(decl)) return renderTypeAlias(decl, name);
  if (ts.isClassDeclaration(decl)) return renderInterface(decl, name);

  // Valor: función, hook, constante o instancia de clase.
  const type = checker.getTypeOfSymbolAtLocation(unalias(sym), decl);
  const typeSymbol = type.getSymbol();
  const typeDecl = typeSymbol ? declOf(typeSymbol) : undefined;
  if (typeDecl && ts.isClassDeclaration(typeDecl)) return renderClassInstance(sym, name);
  return renderFunction(sym, name);
}

/* ------------------------------------------------------------------ *
 * Asignación de cada export a un archivo
 * ------------------------------------------------------------------ */

const componentOf = new Map(); // nombre de componente -> familia
for (const [family, names] of Object.entries(COMPONENTS)) {
  for (const n of names) componentOf.set(n, family);
}

// Un archivo que declara un componente arrastra al resto de sus exports.
const fileFamily = new Map();
for (const [name, family] of componentOf) {
  const sym = exportedSymbols.find((s) => s.getName() === name);
  const decl = sym && declOf(sym);
  if (decl) fileFamily.set(rel(decl.getSourceFile().fileName), family);
}

function placementOf(sym) {
  const name = sym.getName();
  if (SYMBOL_PLACEMENT[name]) return SYMBOL_PLACEMENT[name];
  if (componentOf.has(name)) return componentOf.get(name);
  const decl = declOf(sym);
  if (!decl) return undefined;
  const file = rel(decl.getSourceFile().fileName);
  if (fileFamily.has(file)) return fileFamily.get(file);
  for (const [prefix, family] of PATH_PLACEMENT) {
    if (file === prefix || file.startsWith(prefix)) return family;
  }
  return undefined;
}

/* ------------------------------------------------------------------ *
 * theming.md: sale del CSS y de los mapas de tokens, no de los tipos
 * ------------------------------------------------------------------ */

function parseThemeBlock() {
  const css = fs.readFileSync(CSS_FILE, "utf8");
  const start = css.indexOf("@theme");
  if (start === -1) {
    errors.push("No se encontró el bloque `@theme` en src/index.css.");
    return [];
  }
  const open = css.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const body = css.slice(open + 1, end);
  const rows = [];
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(body))) {
    rows.push({ token: `--${m[1]}`, source: m[2].replace(/\s+/g, " ").trim() });
  }
  return rows;
}

/** Aplana un object literal a claves punteadas: `paddingX.sm` -> `"0.75rem"`. */
function flattenObjectLiteral(node, prefix = "", out = new Map()) {
  for (const p of node.properties) {
    if (!ts.isPropertyAssignment(p) || !p.name) continue;
    const key = prefix ? `${prefix}.${p.name.getText()}` : p.name.getText();
    if (ts.isObjectLiteralExpression(p.initializer)) {
      flattenObjectLiteral(p.initializer, key, out);
    } else {
      out.set(key, p.initializer.getText().replace(/["']/g, ""));
    }
  }
  return out;
}

function densityPresetTable() {
  const presetsFile = program.getSourceFile(path.join(ROOT, "src", "contexts", "presets.ts"));
  if (!presetsFile) return "";
  const names = ["comfortableDensity", "compactDensity", "denseDensity"];
  const tables = {};
  const visit = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name &&
      names.includes(node.name.getText()) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      tables[node.name.getText()] = flattenObjectLiteral(node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(presetsFile);

  const keys = [...new Set(names.flatMap((n) => [...(tables[n] || new Map()).keys()]))];
  if (!keys.length) return "";
  const rows = keys.map((k) => {
    const vals = names.map((n) => (tables[n] && tables[n].get(k)) || "—");
    return `| \`${k}\` | \`${vals[0]}\` | \`${vals[1]}\` | \`${vals[2]}\` |`;
  });
  return [
    "| Token | `comfortable` | `compact` | `dense` |",
    "|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function densityCssVarList() {
  const themeFile = program.getSourceFile(
    path.join(ROOT, "src", "contexts", "ThemeContext.tsx")
  );
  if (!themeFile) return "";
  const tokens = new Set();
  const markers = new Set();
  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && node.name && ts.isStringLiteral(node.name)) {
      const v = node.name.text;
      // `--flysoft-density-name` y `--flysoft-theme-name` son marcadores de
      // identidad (sirven para selectores CSS), no tokens de escala.
      if (/^--flysoft-density-(?!name$)/.test(v)) tokens.add(v);
      else if (/^--flysoft-(density|theme)-name$/.test(v)) markers.add(v);
    }
    ts.forEachChild(node, visit);
  };
  visit(themeFile);
  if (!tokens.size) {
    errors.push(
      "No se encontró ninguna variable `--flysoft-density-*` en ThemeContext.tsx — cambió el mapa de tokens."
    );
    return "";
  }
  const out = [...tokens].sort().map((v) => `- \`${v}\``);
  if (markers.size) {
    out.push(
      "",
      "Además `ThemeProvider` escribe estos marcadores de identidad, útiles para " +
        "escribir selectores CSS condicionales: " +
        [...markers].sort().map((v) => `\`${v}\``).join(", ") +
        "."
    );
  }
  return out.join("\n");
}

function buildTheming(sections) {
  const out = [];
  const themeRows = parseThemeBlock();
  out.push(
    "## Cómo leer las variables",
    "",
    "Hay dos namespaces y no son intercambiables:",
    "",
    "- **`--flysoft-*`** — lo que `ThemeProvider` escribe en `document.documentElement` " +
      "en runtime cuando cambiás de tema o de densidad.",
    "- **`--color-*`, `--shadow-*`, `--radius-*`, `--spacing-*`, `--font-*`** — los tokens " +
      "de Tailwind v4 declarados en el `@theme`, cada uno apuntando a su `--flysoft-*`. " +
      "**Estos son los que se usan en `className`**, por ejemplo " +
      "`text-[var(--color-text-primary)]`.",
    "",
    `## Tokens de Tailwind (${themeRows.length})`,
    "",
    "| Token | Apunta a |",
    "|---|---|",
    ...themeRows.map((r) => `| \`${r.token}\` | \`${cell(r.source)}\` |`),
    "",
    "## Variables de densidad",
    "",
    "Las escribe `ThemeProvider` según la densidad activa. No se usan directo en " +
      "`className` salvo que estés construyendo un componente nuevo que deba escalar.",
    "",
    densityCssVarList(),
    "",
    "## Valores de cada densidad",
    "",
    densityPresetTable(),
    ""
  );
  if (sections.length) {
    out.push("## Tipos", "", sections.join("\n\n"));
  }
  return out.join("\n");
}

/* ------------------------------------------------------------------ *
 * Ensamblado
 * ------------------------------------------------------------------ */

const HEADER = (family) =>
  [
    `<!-- Generado desde los tipos de flysoft-react-ui@${pkg.version}. No editar a mano. -->`,
    `<!-- Regenerar con: npm run docs:skill -->`,
    "",
    `# ${FAMILIES[family].title}`,
    "",
    FAMILIES[family].intro,
    "",
  ].join("\n");

function build() {
  const placed = new Map(Object.keys(FAMILIES).map((f) => [f, []]));
  const unplaced = [];
  const seen = new Set();

  // 1. Componentes primero, en el orden curado del mapa.
  for (const [family, names] of Object.entries(COMPONENTS)) {
    for (const name of names) {
      const md = renderComponent(name);
      if (md) placed.get(family).push(md);
      seen.add(name);
      seen.add(`${name}Props`);
    }
  }

  // 2. El resto de los exports, alfabético para que la salida sea determinística.
  const rest = exportedSymbols
    .filter((s) => !SKIP.has(s.getName()) && !seen.has(s.getName()))
    .sort((a, b) => a.getName().localeCompare(b.getName()));

  const auxByFamily = new Map(Object.keys(FAMILIES).map((f) => [f, []]));
  for (const sym of rest) {
    const family = placementOf(sym);
    if (!family) {
      unplaced.push(sym.getName());
      continue;
    }
    const md = renderSymbol(sym);
    if (md) auxByFamily.get(family).push(md);
  }

  if (unplaced.length) {
    errors.push(
      `Exports sin familia asignada: ${unplaced.join(", ")}. ` +
        `Agregalos a COMPONENTS, SYMBOL_PLACEMENT o PATH_PLACEMENT en scripts/generate-skill-refs.js.`
    );
  }

  const files = new Map();
  for (const family of Object.keys(FAMILIES)) {
    const aux = auxByFamily.get(family);
    let body;
    if (family === "theming") {
      body = buildTheming(aux);
    } else {
      const parts = [...placed.get(family)];
      if (aux.length) parts.push("## Tipos auxiliares", aux.join("\n\n"));
      body = parts.join("\n\n");
    }
    files.set(`${family}.md`, `${HEADER(family)}\n${body.trim()}\n`);
  }
  return files;
}

/* ------------------------------------------------------------------ *
 * Salida
 * ------------------------------------------------------------------ */

const files = build();

if (errors.length) {
  console.error("\nFalló la generación de la referencia:\n");
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(
    "\nMejor romper el build que publicar una tabla vacía que nadie va a revisar.\n"
  );
  process.exit(1);
}

if (warnings.length) {
  console.warn(`\nAvisos (${warnings.length}) — tipos que la referencia no puede describir sola:\n`);
  for (const w of warnings) console.warn(`  ! ${w}`);
  console.warn("");
}

if (CHECK) {
  const stale = [];
  for (const [name, content] of files) {
    const target = path.join(OUT_DIR, name);
    const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : null;
    if (current !== content) stale.push(name);
  }
  if (stale.length) {
    console.error(
      `\nLa referencia está desactualizada: ${stale.join(", ")}\n` +
        `Corré \`npm run docs:skill\` y commiteá el resultado.\n`
    );
    process.exit(1);
  }
  console.log(`Referencia al día (${files.size} archivos).`);
} else {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, content] of files) {
    fs.writeFileSync(path.join(OUT_DIR, name), content, "utf8");
    const lines = content.split("\n").length;
    console.log(`  ${path.join("claude/skills/flysoft-ui/references", name)}  (${lines} líneas)`);
  }
  console.log(`\n${files.size} archivos generados desde los tipos de v${pkg.version}.`);
}

if (STRICT && warnings.length) {
  console.error("--strict: hay avisos, salgo con error.");
  process.exit(1);
}
