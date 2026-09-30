export const categories = [
  "All",
  "Popular",
  "Bold",
  "Italic",
  "Script",
  "Cursive",
  "Gothic",
  "Fraktur",
  "Monospace",
  "Small Caps",
  "Circled",
  "Squared",
  "Double Struck",
  "Full Width",
  "Superscript",
  "Subscript",
  "Decorative",
  "Strike",
  "Glitch",
  "Aesthetic",
  "Cute",
  "Gaming",
  "Instagram",
  "TikTok",
  "Discord",
  "Username",
  "Symbols",
] as const;

export type FontCategory = (typeof categories)[number];

export type FontStyle = {
  id: string;
  name: string;
  category: Exclude<FontCategory, "All">;
  transform: (text: string) => string;
};

function alphabet(upperStart: number, lowerStart: number, exceptions: Record<string, string> = {}) {
  return (text: string) =>
    Array.from(text, (character) => {
      if (exceptions[character]) return exceptions[character];
      const code = character.codePointAt(0)!;
      if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + code - 97);
      return character;
    }).join("");
}

function mapped(text: string, mapping: Record<string, string>) {
  return Array.from(text, (character) => mapping[character] ?? character).join("");
}

const smallCapsMap = Object.fromEntries(
  Array.from("abcdefghijklmnopqrstuvwxyz", (letter, index) => [
    letter,
    String.fromCodePoint(0x1d00 + index),
  ]),
);
Object.assign(smallCapsMap, {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
  k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "ꜱ", t: "ᴛ",
  u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
});

const superscriptMap: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ",
  m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
};

const subscriptMap: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ",
  t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
};

const scriptExceptions = {
  B: "ℬ", E: "ℰ", F: "ℱ", H: "ℋ", I: "ℐ", L: "ℒ", M: "ℳ", R: "ℛ",
  e: "ℯ", g: "ℊ", o: "ℴ",
};

const fullWidthMap = Object.fromEntries([
  ...Array.from("0123456789", (digit, index) => [digit, String.fromCodePoint(0xff10 + index)]),
  [" ", "　"],
]);

const baseStyles: Omit<FontStyle, "id">[] = [
  { name: "Bold Serif", category: "Bold", transform: alphabet(0x1d400, 0x1d41a) },
  { name: "Italic Serif", category: "Italic", transform: alphabet(0x1d434, 0x1d44e, { h: "ℎ" }) },
  { name: "Bold Italic", category: "Bold", transform: alphabet(0x1d468, 0x1d482) },
  { name: "Script", category: "Script", transform: alphabet(0x1d49c, 0x1d4b6, scriptExceptions) },
  { name: "Bold Script", category: "Cursive", transform: alphabet(0x1d4d0, 0x1d4ea) },
  { name: "Fraktur", category: "Fraktur", transform: alphabet(0x1d504, 0x1d51e, { C: "ℭ", H: "ℌ", I: "ℑ", R: "ℜ" }) },
  { name: "Bold Fraktur", category: "Gothic", transform: alphabet(0x1d56c, 0x1d586) },
  { name: "Double Struck", category: "Double Struck", transform: alphabet(0x1d538, 0x1d552, { C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ" }) },
  { name: "Sans Serif", category: "Popular", transform: alphabet(0x1d5a0, 0x1d5ba) },
  { name: "Sans Bold", category: "Bold", transform: alphabet(0x1d5d4, 0x1d5ee) },
  { name: "Sans Italic", category: "Italic", transform: alphabet(0x1d608, 0x1d622) },
  { name: "Sans Bold Italic", category: "Bold", transform: alphabet(0x1d63c, 0x1d656) },
  { name: "Monospace", category: "Monospace", transform: alphabet(0x1d670, 0x1d68a) },
  { name: "Full Width", category: "Full Width", transform: (text) => mapped(alphabet(0xff21, 0xff41)(text), fullWidthMap) },
  { name: "Small Caps", category: "Small Caps", transform: (text) => mapped(text.toLowerCase(), smallCapsMap) },
  {
    name: "Circled",
    category: "Circled",
    transform: (text) => Array.from(text, (character) => {
      const code = character.codePointAt(0)!;
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + code - 97);
      if (character === "0") return "⓪";
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
      return character;
    }).join(""),
  },
  { name: "Squared", category: "Squared", transform: (text) => `【${text}】` },
  { name: "Superscript", category: "Superscript", transform: (text) => mapped(text.toLowerCase(), superscriptMap) },
  { name: "Subscript", category: "Subscript", transform: (text) => mapped(text.toLowerCase(), subscriptMap) },
  { name: "Strikethrough", category: "Strike", transform: (text) => Array.from(text, (character) => `${character}\u0336`).join("") },
  { name: "Underline", category: "Decorative", transform: (text) => Array.from(text, (character) => `${character}\u0332`).join("") },
  { name: "Aesthetic Spaced", category: "Aesthetic", transform: (text) => Array.from(text).join(" ") },
  { name: "Glitch Light", category: "Glitch", transform: (text) => Array.from(text, (character) => `${character}\u0334\u0307`).join("") },
  { name: "Cute Hearts", category: "Cute", transform: (text) => `♡ ${text} ♡` },
  { name: "Gaming Brackets", category: "Gaming", transform: (text) => `『${text}』` },
  { name: "Instagram Bold", category: "Instagram", transform: alphabet(0x1d5d4, 0x1d5ee) },
  { name: "TikTok Style", category: "TikTok", transform: alphabet(0x1d63c, 0x1d656) },
  { name: "Discord Bold", category: "Discord", transform: alphabet(0x1d400, 0x1d41a) },
  { name: "Username Clean", category: "Username", transform: alphabet(0x1d5a0, 0x1d5ba) },
];

const decorations = [
  { name: "Stars", category: "Symbols" as const, before: "✦ ", after: " ✦" },
  { name: "Sparkles", category: "Aesthetic" as const, before: "✧ ", after: " ✧" },
  { name: "Wings", category: "Gaming" as const, before: "꧁ ", after: " ꧂" },
  { name: "Diamonds", category: "Decorative" as const, before: "◈ ", after: " ◈" },
  { name: "Cute Bows", category: "Cute" as const, before: "୨୧ ", after: " ୨୧" },
  { name: "Soft Hearts", category: "Cute" as const, before: "♥ ", after: " ♥" },
  { name: "Wave", category: "Aesthetic" as const, before: "〜 ", after: " 〜" },
  { name: "Gaming Tags", category: "Username" as const, before: "乂 ", after: " 乂" },
  { name: "Crown", category: "Gaming" as const, before: "♛ ", after: " ♛" },
  { name: "Minimal Dots", category: "Popular" as const, before: "· ", after: " ·" },
];

export const fontStyles: FontStyle[] = [
  ...baseStyles.map((style, index) => ({ ...style, id: `style-${index + 1}` })),
  ...baseStyles.slice(0, 12).flatMap((style, styleIndex) =>
    decorations.map((decoration, decorationIndex) => ({
      id: `decorated-${styleIndex + 1}-${decorationIndex + 1}`,
      name: `${decoration.name} ${style.name}`,
      category: decoration.category,
      transform: (text: string) => `${decoration.before}${style.transform(text)}${decoration.after}`,
    })),
  ),
];

export function transformText(text: string, style: FontStyle) {
  return style.transform(text);
}