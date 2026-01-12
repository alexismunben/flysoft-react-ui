/**
 * Normaliza las clases de iconos de FontAwesome para usar el estilo light (fal) por defecto
 * 
 * Convierte:
 * - "fa fa-user" -> "fal fa-user"
 * - "fas fa-user" -> "fal fa-user"
 * - "far fa-user" -> "fal fa-user"
 * - "fal fa-user" -> "fal fa-user" (ya es light, se mantiene)
 * - "fa-user" -> "fal fa-user"
 * - "fa-spinner fa-spin" -> "fal fa-spinner fa-spin" (preserva clases adicionales)
 * 
 * @param iconClass - La clase del icono a normalizar
 * @returns La clase del icono normalizada con el estilo light (fal)
 */
export function normalizeIconClass(iconClass: string | undefined): string {
  if (!iconClass) return "";

  // Dividir las clases por espacios
  const classes = iconClass.trim().split(/\s+/);

  // Buscar y reemplazar el prefijo de estilo
  const stylePrefixes = ["fas", "far", "fal", "fab"];
  let hasStylePrefix = false;

  const normalizedClasses = classes.map((cls) => {
    // Si es un prefijo de estilo, reemplazarlo por "fal"
    if (stylePrefixes.includes(cls)) {
      hasStylePrefix = true;
      return "fal";
    }
    return cls;
  });

  // Si no tenía prefijo de estilo y la primera clase empieza con "fa-", agregar "fal" al inicio
  if (!hasStylePrefix && classes[0]?.startsWith("fa-")) {
    normalizedClasses.unshift("fal");
  }
  // Si no tenía prefijo de estilo y ninguna clase es un prefijo, agregar "fal" al inicio
  else if (!hasStylePrefix && !classes.some(cls => stylePrefixes.includes(cls))) {
    normalizedClasses.unshift("fal");
  }

  return normalizedClasses.join(" ");
}

