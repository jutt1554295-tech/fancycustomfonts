export const appearanceStorageKey = "fancycustomfonts-appearance-v1";

export const accentPresets = [
  { name: "Cyan", color: "#67e8f9" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Purple", color: "#a855f7" },
  { name: "Pink", color: "#ec4899" },
  { name: "Orange", color: "#f97316" },
  { name: "Red", color: "#ef4444" },
] as const;

export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

export type AppearancePreferences = {
  mode: ThemeMode;
  accent: string;
  brightness: number;
  transparency: number;
  blur: number;
  glow: number;
};

export const defaultAppearance: AppearancePreferences = {
  mode: "light",
  accent: "#67e8f9",
  brightness: 18,
  transparency: 55,
  blur: 22,
  glow: 30,
};

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function hexToRgb(hex: string): RGB {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
}

function mixHex(first: string, second: string, amount: number) {
  const a = hexToRgb(first);
  const b = hexToRgb(second);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;
  const lightness = (maximum + minimum) / 2;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    switch (maximum) {
      case red:
        hue = ((green - blue) / delta) % 6;
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return { h: hue, s: saturation, l: lightness };
}

function hslToHex({ h, s, l }: HSL) {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const segment = h / 60;
  const x = chroma * (1 - Math.abs((segment % 2) - 1));
  const [r, g, b] = segment < 1 ? [chroma, x, 0]
    : segment < 2 ? [x, chroma, 0]
      : segment < 3 ? [0, chroma, x]
        : segment < 4 ? [0, x, chroma]
          : segment < 5 ? [x, 0, chroma]
            : [chroma, 0, x];
  const offset = l - chroma / 2;
  return rgbToHex({ r: (r + offset) * 255, g: (g + offset) * 255, b: (b + offset) * 255 });
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${clamp(alpha, 0, 1).toFixed(3)})`;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const linearize = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function readableText(...backgrounds: string[]) {
  const minimumContrast = (foreground: string) => Math.min(...backgrounds.map((background) => {
    const first = luminance(foreground);
    const second = luminance(background);
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
  }));

  return minimumContrast("#05070d") >= minimumContrast("#ffffff") ? "#05070d" : "#ffffff";
}

export function normalizeAppearance(value: unknown): AppearancePreferences {
  const source = typeof value === "object" && value !== null && "preferences" in value
    ? (value as { preferences: unknown }).preferences
    : value;
  if (typeof source !== "object" || source === null) return { ...defaultAppearance };

  const candidate = source as Partial<AppearancePreferences>;
  const mode: ThemeMode = candidate.mode === "light" || candidate.mode === "system" ? candidate.mode : "dark";
  const accent = typeof candidate.accent === "string" && /^#[\da-f]{6}$/i.test(candidate.accent)
    ? candidate.accent.toLowerCase()
    : defaultAppearance.accent;
  const numericPreference = (input: unknown, fallback: number, min: number, max: number) =>
    typeof input === "number" && Number.isFinite(input) ? clamp(Math.round(input), min, max) : fallback;

  return {
    mode,
    accent,
    brightness: numericPreference(candidate.brightness, defaultAppearance.brightness, 0, 100),
    transparency: numericPreference(candidate.transparency, defaultAppearance.transparency, 20, 85),
    blur: numericPreference(candidate.blur, defaultAppearance.blur, 0, 28),
    glow: numericPreference(candidate.glow, defaultAppearance.glow, 0, 100),
  };
}

export function getAppearanceVariables(
  preferences: AppearancePreferences,
  theme: ResolvedTheme,
): Record<string, string> {
  const isLight = theme === "light";
  const alternateHsl = rgbToHsl(hexToRgb(preferences.accent));
  const alternateAccent = hslToHex({
    h: (alternateHsl.h + 48) % 360,
    s: clamp(alternateHsl.s * 0.72, 0.34, 0.78),
    l: clamp(alternateHsl.l, 0.48, 0.66),
  });
  const accentSoft = mixHex(preferences.accent, "#ffffff", 0.2);
  const alternateSoft = mixHex(alternateAccent, "#ffffff", 0.2);
  const accentText = mixHex(preferences.accent, isLight ? "#172033" : "#ffffff", isLight ? 0.32 : 0.26);
  const alternateText = mixHex(alternateAccent, isLight ? "#172033" : "#ffffff", isLight ? 0.32 : 0.26);
  const brightness = preferences.brightness / 100;
  const page = isLight
    ? mixHex("#dce3ef", "#ffffff", brightness)
    : mixHex("#03050a", "#192236", brightness);
  const surfaceAlpha = 0.9 - (preferences.transparency / 100) * 0.66;
  const glow = preferences.glow / 100;
  const baseRgb = isLight ? "255,255,255" : "17,21,34";
  const strongRgb = isLight ? "250,252,255" : "9,12,21";
  const borderRgb = isLight ? "45,58,83" : "208,221,245";

  return {
    "--page": page,
    "--ink": isLight ? "#111827" : "#ffffff",
    "--muted": isLight ? "#44516a" : "#a5b0c3",
    "--subtle": isLight ? "#65738b" : "#7d879c",
    "--glass-background": `rgba(${baseRgb},${surfaceAlpha.toFixed(3)})`,
    "--glass-strong": `rgba(${strongRgb},${isLight ? 0.94 : 0.96})`,
    "--glass-border": `rgba(${borderRgb},${isLight ? 0.16 : 0.12})`,
    "--glass-border-strong": `rgba(${borderRgb},${isLight ? 0.25 : 0.22})`,
    "--glass-blur": `${preferences.blur}px`,
    "--accent": preferences.accent,
    "--accent-rgb": Object.values(hexToRgb(preferences.accent)).join(","),
    "--accent-alt": alternateAccent,
    "--accent-alt-rgb": Object.values(hexToRgb(alternateAccent)).join(","),
    "--accent-soft": accentSoft,
    "--accent-alt-soft": alternateSoft,
    "--accent-text": accentText,
    "--accent-alt-text": alternateText,
    "--accent-contrast": readableText(preferences.accent, accentSoft),
    "--accent-border": rgba(preferences.accent, 0.14 + glow * 0.2),
    "--accent-glow": rgba(preferences.accent, glow * 0.34),
    "--accent-alt-glow": rgba(alternateAccent, glow * 0.28),
    "--ambient-glow": rgba(preferences.accent, glow * 0.14),
    "--ambient-alt-glow": rgba(alternateAccent, glow * 0.1),
    "--input-surface": isLight ? `rgba(255,255,255,${surfaceAlpha.toFixed(3)})` : `rgba(4,6,12,${surfaceAlpha.toFixed(3)})`,
  };
}

export function resolveTheme(mode: ThemeMode, systemPrefersLight: boolean): ResolvedTheme {
  if (mode === "system") return systemPrefersLight ? "light" : "dark";
  return mode;
}
