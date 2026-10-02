import type { RealFont } from "@/data/fontCatalog";

export function fontFamilyStack(font: RealFont) {
  const family = font.fontFamily.trim();

  if (family.startsWith("var(")) {
    return `${family}, ${font.fallback}`;
  }

  return `"${family}", ${font.fallback}`;
}

export function fontFaceRules(fonts: readonly RealFont[]) {
  return fonts
    .filter((font) => font.available && /^\/fonts\/[a-z0-9-]+\.woff2$/.test(font.filePath))
    .map((font) => {
      const family = font.fontFamily.replace(/["\\]/g, "\\$&");
      return `@font-face{font-family:"${family}";src:url("${font.filePath}") format("woff2");font-style:normal;font-weight:${font.fontWeightRange ?? "400"};font-display:swap}`;
    })
    .join("\n");
}
