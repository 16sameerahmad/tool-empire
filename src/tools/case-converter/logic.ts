export function toCamelCase(str: string): string {
  const words = str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
  if (!words.length || words[0] === "") return "";
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}

export function toPascalCase(str: string): string {
  const words = str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
  if (!words.length || words[0] === "") return "";
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toKebabCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
    .join("-");
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}
