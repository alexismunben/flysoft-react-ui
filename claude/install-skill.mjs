#!/usr/bin/env node

/**
 * Copia la skill `flysoft-ui` desde node_modules hacia el .claude/skills/ de la
 * app consumidora.
 *
 * Claude Code no levanta skills desde node_modules, así que hace falta este paso
 * de copia. La copia es DESTRUCTIVA Y COMPLETA: se borra el destino y se vuelve
 * a copiar entero. Nunca hay merge. Si alguien editó la copia, esa edición se
 * pierde — la fuente de verdad es el repo de flysoft-react-ui.
 *
 * Si el paquete instalado no trae `claude/` (versión anterior a la 1.4.0), avisa
 * y sale con 0: no rompe el `update-libraries` de la app.
 *
 * Este archivo viaja dentro del paquete. Se puede correr de dos formas:
 *
 *   node node_modules/flysoft-react-ui/claude/install-skill.mjs
 *
 * o copiándolo al repo de la app (recomendado, ver AGENT_INSTRUCTIONS del repo
 * de la librería) para que el script exista aunque el paquete no lo traiga:
 *
 *   cp node_modules/flysoft-react-ui/claude/install-skill.mjs scripts/
 *   node scripts/install-skill.mjs
 */

import fs from "node:fs";
import path from "node:path";

const SKILL_NAME = "flysoft-ui";
const PACKAGE_NAME = "flysoft-react-ui";

// Los scripts de npm corren con el cwd en la raíz del paquete de la app.
const appRoot = process.cwd();
const packageRoot = path.join(appRoot, "node_modules", PACKAGE_NAME);
const source = path.join(packageRoot, "claude", "skills", SKILL_NAME);
const target = path.join(appRoot, ".claude", "skills", SKILL_NAME);

const label = `${PACKAGE_NAME} → .claude/skills/${SKILL_NAME}`;

if (!fs.existsSync(packageRoot)) {
  console.warn(
    `[skill] ${PACKAGE_NAME} no está instalado. Se omite la sincronización de la skill.`
  );
  process.exit(0);
}

if (!fs.existsSync(source)) {
  let version = "desconocida";
  try {
    version = JSON.parse(
      fs.readFileSync(path.join(packageRoot, "package.json"), "utf8")
    ).version;
  } catch {
    // Sin package.json legible no vale la pena insistir: el aviso alcanza.
  }
  console.warn(
    `[skill] ${PACKAGE_NAME}@${version} no incluye claude/skills/${SKILL_NAME}. ` +
      `Se omite la sincronización (hace falta 1.4.0 o superior).`
  );
  process.exit(0);
}

let version = "desconocida";
try {
  version = JSON.parse(
    fs.readFileSync(path.join(packageRoot, "package.json"), "utf8")
  ).version;
} catch {
  // Se sigue igual: la versión es informativa.
}

try {
  // Destructivo a propósito: cualquier edición local del destino se descarta.
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
} catch (error) {
  console.error(`[skill] Falló la copia ${label}: ${error.message}`);
  process.exit(1);
}

const count = fs
  .readdirSync(target, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile()).length;

console.log(`[skill] ${label} — ${count} archivos desde v${version}.`);
