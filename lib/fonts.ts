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

function alphabet(
  upperStart: number,
  lowerStart: number,
  exceptions: Record<string, string> = {},
) {
  return (text: string) =>
    Array.from(text, (character) => {
      if (exceptions[character]) {
        return exceptions[character];
      }

      const code = character.codePointAt(0)!;

      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(upperStart + code - 65);
      }

      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(lowerStart + code - 97);
      }

      return character;
    }).join("");
}

function mapped(text: string, mapping: Record<string, string>) {
  return Array.from(text, (character) => mapping[character] ?? character).join("");
}

function wrap(before: string, after: string) {
  return (text: string) => `${before}${text}${after}`;
}

/* -------------------------------------------------------------------------- */
/* SMALL CAPS                                                                 */
/* -------------------------------------------------------------------------- */

const smallCapsMap: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

/* -------------------------------------------------------------------------- */
/* SUPERSCRIPT / SUBSCRIPT                                                    */
/* -------------------------------------------------------------------------- */

const superscriptMap: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

const subscriptMap: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
};

/* -------------------------------------------------------------------------- */
/* SCRIPT / FRAKTUR                                                           */
/* -------------------------------------------------------------------------- */

const scriptExceptions: Record<string, string> = {
  B: "ℬ",
  E: "ℰ",
  F: "ℱ",
  H: "ℋ",
  I: "ℐ",
  L: "ℒ",
  M: "ℳ",
  R: "ℛ",
  e: "ℯ",
  g: "ℊ",
  o: "ℴ",
};

/* -------------------------------------------------------------------------- */
/* DOUBLE STRUCK                                                              */
/* -------------------------------------------------------------------------- */

const doubleStruckUpper = alphabet(0x1d538, 0x1d552, {
  C: "ℂ",
  H: "ℍ",
  N: "ℕ",
  P: "ℙ",
  Q: "ℚ",
  R: "ℝ",
  Z: "ℤ",
});

const doubleStruckNumberMap: Record<string, string> = Object.fromEntries(
  Array.from("0123456789", (digit, index) => [
    digit,
    String.fromCodePoint(0x1d7d8 + index),
  ]),
);

const doubleStruckNumbers = (text: string) =>
  mapped(text, doubleStruckNumberMap);

const doubleStruckLower = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x1d552 + code - 97);
    }

    return character;
  }).join("");

const doubleStruckMixed = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 65 && code <= 90) {
      return doubleStruckUpper(character);
    }

    if (code >= 97 && code <= 122) {
      return doubleStruckLower(character);
    }

    if (doubleStruckNumberMap[character]) {
      return doubleStruckNumberMap[character];
    }

    return character;
  }).join("");

/* -------------------------------------------------------------------------- */
/* FULL WIDTH                                                                 */
/* -------------------------------------------------------------------------- */

const fullWidthTransform = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (character === " ") {
      return "　";
    }

    if (code >= 0x21 && code <= 0x7e) {
      return String.fromCodePoint(code + 0xfee0);
    }

    return character;
  }).join("");

const fullWidthLettersOnly = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0xff21 + code - 65);
    }

    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0xff41 + code - 97);
    }

    return character;
  }).join("");

const fullWidthNumbers = (text: string) =>
  mapped(
    text,
    Object.fromEntries(
      Array.from("0123456789", (digit, index) => [
        digit,
        String.fromCodePoint(0xff10 + index),
      ]),
    ),
  );

/* -------------------------------------------------------------------------- */
/* CIRCLED                                                                    */
/* -------------------------------------------------------------------------- */

const circledUppercase = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0x24b6 + code - 65);
    }

    return character;
  }).join("");

const circledLowercase = (text: string) =>
  Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x24d0 + code - 97);
    }

    return character;
  }).join("");

const circledNumbers = (text: string) =>
  Array.from(text, (character) => {
    if (character === "0") {
      return "⓪";
    }

    const code = character.codePointAt(0)!;

    if (code >= 49 && code <= 57) {
      return String.fromCodePoint(0x2460 + code - 49);
    }

    return character;
  }).join("");

const circledMixed = (text: string) => {
  return Array.from(text, (character) => {
    const code = character.codePointAt(0)!;

    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0x24b6 + code - 65);
    }

    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x24d0 + code - 97);
    }

    if (character === "0") {
      return "⓪";
    }

    if (code >= 49 && code <= 57) {
      return String.fromCodePoint(0x2460 + code - 49);
    }

    return character;
  }).join("");
};

/* -------------------------------------------------------------------------- */
/* STRIKE                                                                     */
/* -------------------------------------------------------------------------- */

function combiningTransform(mark: string) {
  return (text: string) =>
    Array.from(text, (character) => `${character}${mark}`).join("");
}

const strike = combiningTransform("\u0336");
const doubleStrike = combiningTransform("\u0336\u0336");
const shortStrike = combiningTransform("\u0335");
const slashStrike = combiningTransform("\u0338");
const crossStrike = combiningTransform("\u0337");
const underline = combiningTransform("\u0332");

/* -------------------------------------------------------------------------- */
/* GLITCH                                                                     */
/* -------------------------------------------------------------------------- */

const glitchLight = (text: string) =>
  Array.from(text, (character) => `${character}\u0307`).join("");

const glitchHeavy = (text: string) =>
  Array.from(text, (character) => `${character}\u0307\u0308\u0334`).join("");

const glitchAbove = (text: string) =>
  Array.from(text, (character) => `${character}\u0307\u0304\u0305`).join("");

const glitchBelow = (text: string) =>
  Array.from(text, (character) => `${character}\u0332\u0333`).join("");

const corruptedText = (text: string) =>
  Array.from(text, (character) => `${character}\u030d\u0310\u034f`).join("");

const distortedText = (text: string) =>
  Array.from(text, (character) => `${character}\u0303\u0315\u0338`).join("");

/* -------------------------------------------------------------------------- */
/* BASE UNICODE STYLES                                                        */
/* -------------------------------------------------------------------------- */

const baseStyles: Omit<FontStyle, "id">[] = [
  {
    name: "Bold Serif",
    category: "Bold",
    transform: alphabet(0x1d400, 0x1d41a),
  },
  {
    name: "Italic Serif",
    category: "Italic",
    transform: alphabet(0x1d434, 0x1d44e, { h: "ℎ" }),
  },
  {
    name: "Bold Italic",
    category: "Bold",
    transform: alphabet(0x1d468, 0x1d482),
  },
  {
    name: "Script",
    category: "Script",
    transform: alphabet(0x1d49c, 0x1d4b6, scriptExceptions),
  },
  {
    name: "Bold Script",
    category: "Cursive",
    transform: alphabet(0x1d4d0, 0x1d4ea),
  },
  {
    name: "Fraktur",
    category: "Fraktur",
    transform: alphabet(0x1d504, 0x1d51e, {
      C: "ℭ",
      H: "ℌ",
      I: "ℑ",
      R: "ℜ",
    }),
  },
  {
    name: "Bold Fraktur",
    category: "Gothic",
    transform: alphabet(0x1d56c, 0x1d586),
  },
  {
    name: "Double Struck",
    category: "Double Struck",
    transform: doubleStruckMixed,
  },
  {
    name: "Sans Serif",
    category: "Popular",
    transform: alphabet(0x1d5a0, 0x1d5ba),
  },
  {
    name: "Sans Bold",
    category: "Bold",
    transform: alphabet(0x1d5d4, 0x1d5ee),
  },
  {
    name: "Sans Italic",
    category: "Italic",
    transform: alphabet(0x1d608, 0x1d622),
  },
  {
    name: "Sans Bold Italic",
    category: "Bold",
    transform: alphabet(0x1d63c, 0x1d656),
  },
  {
    name: "Monospace",
    category: "Monospace",
    transform: alphabet(0x1d670, 0x1d68a),
  },
  {
    name: "Full Width",
    category: "Full Width",
    transform: fullWidthTransform,
  },
  {
    name: "Small Caps",
    category: "Small Caps",
    transform: (text) => mapped(text.toLowerCase(), smallCapsMap),
  },
  {
    name: "Circled",
    category: "Circled",
    transform: circledMixed,
  },
  {
    name: "Squared",
    category: "Squared",
    transform: wrap("【", "】"),
  },
  {
    name: "Superscript",
    category: "Superscript",
    transform: (text) => mapped(text.toLowerCase(), superscriptMap),
  },
  {
    name: "Subscript",
    category: "Subscript",
    transform: (text) => mapped(text.toLowerCase(), subscriptMap),
  },
  {
    name: "Strikethrough",
    category: "Strike",
    transform: strike,
  },
  {
    name: "Underline",
    category: "Decorative",
    transform: underline,
  },
  {
    name: "Aesthetic Spaced",
    category: "Aesthetic",
    transform: (text) => Array.from(text).join(" "),
  },
  {
    name: "Glitch Light",
    category: "Glitch",
    transform: glitchLight,
  },
  {
    name: "Cute Hearts",
    category: "Cute",
    transform: wrap("♡ ", " ♡"),
  },
  {
    name: "Gaming Brackets",
    category: "Gaming",
    transform: wrap("『", "』"),
  },
  {
    name: "Instagram Bold",
    category: "Instagram",
    transform: alphabet(0x1d5d4, 0x1d5ee),
  },
  {
    name: "TikTok Style",
    category: "TikTok",
    transform: alphabet(0x1d63c, 0x1d656),
  },
  {
    name: "Discord Bold",
    category: "Discord",
    transform: alphabet(0x1d400, 0x1d41a),
  },
  {
    name: "Username Clean",
    category: "Username",
    transform: alphabet(0x1d5a0, 0x1d5ba),
  },
];

/* -------------------------------------------------------------------------- */
/* EXTENDED UNICODE STYLES                                                    */
/* -------------------------------------------------------------------------- */

const extendedStyles: Omit<FontStyle, "id">[] = [
  /* Double Struck */
  {
    name: "Double Struck Capital",
    category: "Double Struck",
    transform: doubleStruckUpper,
  },
  {
    name: "Double Struck Lowercase",
    category: "Double Struck",
    transform: doubleStruckLower,
  },
  {
    name: "Double Struck Numbers",
    category: "Double Struck",
    transform: doubleStruckNumbers,
  },
  {
    name: "Double Struck Mixed",
    category: "Double Struck",
    transform: doubleStruckMixed,
  },

  /* Full Width */
  {
    name: "Fullwidth Latin",
    category: "Full Width",
    transform: fullWidthTransform,
  },
  {
    name: "Fullwidth Letters",
    category: "Full Width",
    transform: fullWidthLettersOnly,
  },
  {
    name: "Fullwidth Numbers",
    category: "Full Width",
    transform: fullWidthNumbers,
  },
  {
    name: "Fullwidth Spaced",
    category: "Full Width",
    transform: (text) =>
      Array.from(fullWidthTransform(text)).join(""),
  },

  /* Superscript */
  {
    name: "Superscript Letters",
    category: "Superscript",
    transform: (text) => mapped(text.toLowerCase(), superscriptMap),
  },
  {
    name: "Superscript Numbers",
    category: "Superscript",
    transform: (text) =>
      mapped(text, {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
      }),
  },
  {
    name: "Superscript Symbols",
    category: "Superscript",
    transform: (text) =>
      mapped(text, {
        "+": "⁺",
        "-": "⁻",
        "=": "⁼",
        "(": "⁽",
        ")": "⁾",
      }),
  },
  {
    name: "Superscript Numbers & Symbols",
    category: "Superscript",
    transform: (text) => mapped(text, superscriptMap),
  },
  {
    name: "Modifier Superscript",
    category: "Superscript",
    transform: (text) => mapped(text.toLowerCase(), superscriptMap),
  },

  /* Subscript */
  {
    name: "Subscript Letters",
    category: "Subscript",
    transform: (text) => mapped(text.toLowerCase(), subscriptMap),
  },
  {
    name: "Subscript Numbers",
    category: "Subscript",
    transform: (text) =>
      mapped(text, {
        "0": "₀",
        "1": "₁",
        "2": "₂",
        "3": "₃",
        "4": "₄",
        "5": "₅",
        "6": "₆",
        "7": "₇",
        "8": "₈",
        "9": "₉",
      }),
  },
  {
    name: "Subscript Symbols",
    category: "Subscript",
    transform: (text) =>
      mapped(text, {
        "+": "₊",
        "-": "₋",
        "=": "₌",
        "(": "₍",
        ")": "₎",
      }),
  },
  {
    name: "Chemical Subscript",
    category: "Subscript",
    transform: (text) => mapped(text.toLowerCase(), subscriptMap),
  },

  /* Strike */
  {
    name: "Strikethrough",
    category: "Strike",
    transform: strike,
  },
  {
    name: "Double Strikethrough",
    category: "Strike",
    transform: doubleStrike,
  },
  {
    name: "Short Strike",
    category: "Strike",
    transform: shortStrike,
  },
  {
    name: "Long Strike",
    category: "Strike",
    transform: strike,
  },
  {
    name: "Slash Text",
    category: "Strike",
    transform: slashStrike,
  },
  {
    name: "Crossed Text",
    category: "Strike",
    transform: crossStrike,
  },

  /* Glitch */
  {
    name: "Glitch Light",
    category: "Glitch",
    transform: glitchLight,
  },
  {
    name: "Glitch Heavy",
    category: "Glitch",
    transform: glitchHeavy,
  },
  {
    name: "Glitch Above",
    category: "Glitch",
    transform: glitchAbove,
  },
  {
    name: "Glitch Below",
    category: "Glitch",
    transform: glitchBelow,
  },
  {
    name: "Corrupted Text",
    category: "Glitch",
    transform: corruptedText,
  },
  {
    name: "Distorted Text",
    category: "Glitch",
    transform: distortedText,
  },

  /* Small Caps */
  {
    name: "Small Caps Classic",
    category: "Small Caps",
    transform: (text) => mapped(text.toLowerCase(), smallCapsMap),
  },
  {
    name: "Small Capital Letters",
    category: "Small Caps",
    transform: (text) => mapped(text.toLowerCase(), smallCapsMap),
  },
  {
    name: "Small Caps Bold",
    category: "Small Caps",
    transform: (text) =>
      mapped(text.toLowerCase(), smallCapsMap),
  },
  {
    name: "Small Caps Spaced",
    category: "Small Caps",
    transform: (text) =>
      Array.from(mapped(text.toLowerCase(), smallCapsMap)).join(" "),
  },

  /* Circled */
  {
    name: "Circled Uppercase",
    category: "Circled",
    transform: circledUppercase,
  },
  {
    name: "Circled Lowercase",
    category: "Circled",
    transform: circledLowercase,
  },
  {
    name: "Circled Numbers",
    category: "Circled",
    transform: circledNumbers,
  },
  {
    name: "Circled Mixed",
    category: "Circled",
    transform: circledMixed,
  },
  {
    name: "Circled Brackets",
    category: "Circled",
    transform: wrap("ⓘ ", " ⓘ"),
  },

  /* Squared */
  {
    name: "Squared Text",
    category: "Squared",
    transform: wrap("【", "】"),
  },
  {
    name: "Boxed Text",
    category: "Squared",
    transform: wrap("『", "』"),
  },
  {
    name: "Double Boxed",
    category: "Squared",
    transform: wrap("╔", "╗"),
  },
  {
    name: "Squared Brackets",
    category: "Squared",
    transform: wrap("▣ ", " ▣"),
  },

  /* Decorative */
  {
    name: "Decorative Diamonds",
    category: "Decorative",
    transform: wrap("◇ ", " ◇"),
  },
  {
    name: "Decorative Flowers",
    category: "Decorative",
    transform: wrap("❀ ", " ❀"),
  },
  {
    name: "Decorative Stars",
    category: "Decorative",
    transform: wrap("✦ ", " ✦"),
  },
  {
    name: "Decorative Lines",
    category: "Decorative",
    transform: wrap("༺ ", " ༻"),
  },
  {
    name: "Decorative Corners",
    category: "Decorative",
    transform: wrap("╭─ ", " ─╮"),
  },
  {
    name: "Decorative Brackets",
    category: "Decorative",
    transform: wrap("〖 ", " 〗"),
  },

  /* Aesthetic */
  {
    name: "Aesthetic Spaced",
    category: "Aesthetic",
    transform: (text) => Array.from(text).join(" "),
  },
  {
    name: "Aesthetic Wide",
    category: "Aesthetic",
    transform: (text) => Array.from(text).join("  "),
  },
  {
    name: "Aesthetic Dots",
    category: "Aesthetic",
    transform: wrap("· ", " ·"),
  },
  {
    name: "Aesthetic Stars",
    category: "Aesthetic",
    transform: wrap("✧ ", " ✧"),
  },
  {
    name: "Aesthetic Waves",
    category: "Aesthetic",
    transform: wrap("〜 ", " 〜"),
  },
  {
    name: "Aesthetic Minimal",
    category: "Aesthetic",
    transform: wrap("⋆ ", " ⋆"),
  },

  /* Cute */
  {
    name: "Cute Hearts",
    category: "Cute",
    transform: wrap("♡ ", " ♡"),
  },
  {
    name: "Cute Bows",
    category: "Cute",
    transform: wrap("୨୧ ", " ୨୧"),
  },
  {
    name: "Cute Stars",
    category: "Cute",
    transform: wrap("☆ ", " ☆"),
  },
  {
    name: "Cute Flowers",
    category: "Cute",
    transform: wrap("ꕤ ", " ꕤ"),
  },
  {
    name: "Cute Sparkles",
    category: "Cute",
    transform: wrap("✧ ", " ✧"),
  },
  {
    name: "Cute Face",
    category: "Cute",
    transform: wrap("（＾ω＾） ", " ♡"),
  },

  /* Gaming */
  {
    name: "Gaming Brackets",
    category: "Gaming",
    transform: wrap("『 ", " 』"),
  },
  {
    name: "Gaming Wings",
    category: "Gaming",
    transform: wrap("꧁ ", " ꧂"),
  },
  {
    name: "Gaming Crown",
    category: "Gaming",
    transform: wrap("♛ ", " ♛"),
  },
  {
    name: "Gaming Tags",
    category: "Gaming",
    transform: wrap("乂 ", " 乂"),
  },
  {
    name: "Gaming Battle",
    category: "Gaming",
    transform: wrap("亗 ", " 亗"),
  },
  {
    name: "Gaming Elite",
    category: "Gaming",
    transform: wrap("メ ", " メ"),
  },

  /* Instagram */
  {
    name: "Instagram Bold",
    category: "Instagram",
    transform: alphabet(0x1d5d4, 0x1d5ee),
  },
  {
    name: "Instagram Italic",
    category: "Instagram",
    transform: alphabet(0x1d608, 0x1d622),
  },
  {
    name: "Instagram Aesthetic",
    category: "Instagram",
    transform: wrap("♡ ", " ♡"),
  },
  {
    name: "Instagram Spaced",
    category: "Instagram",
    transform: (text) => Array.from(text).join("  "),
  },
  {
    name: "Instagram Clean",
    category: "Instagram",
    transform: alphabet(0x1d400, 0x1d41a),
  },

  /* TikTok */
  {
    name: "TikTok Bold",
    category: "TikTok",
    transform: alphabet(0x1d5d4, 0x1d5ee),
  },
  {
    name: "TikTok Italic",
    category: "TikTok",
    transform: alphabet(0x1d608, 0x1d622),
  },
  {
    name: "TikTok Gaming",
    category: "TikTok",
    transform: wrap("乂 ", " 乂"),
  },
  {
    name: "TikTok Glitch",
    category: "TikTok",
    transform: glitchLight,
  },
  {
    name: "TikTok Clean",
    category: "TikTok",
    transform: alphabet(0x1d5a0, 0x1d5ba),
  },

  /* Discord */
  {
    name: "Discord Bold",
    category: "Discord",
    transform: alphabet(0x1d400, 0x1d41a),
  },
  {
    name: "Discord Monospace",
    category: "Discord",
    transform: alphabet(0x1d670, 0x1d68a),
  },
  {
    name: "Discord Italic",
    category: "Discord",
    transform: alphabet(0x1d608, 0x1d622),
  },
  {
    name: "Discord Spaced",
    category: "Discord",
    transform: (text) => Array.from(text).join(" "),
  },
  {
    name: "Discord Minimal",
    category: "Discord",
    transform: wrap("• ", " •"),
  },

  /* Username */
  {
    name: "Username Clean",
    category: "Username",
    transform: alphabet(0x1d5a0, 0x1d5ba),
  },
  {
    name: "Username Bold",
    category: "Username",
    transform: alphabet(0x1d400, 0x1d41a),
  },
  {
    name: "Username Gaming",
    category: "Username",
    transform: wrap("乂 ", " 乂"),
  },
  {
    name: "Username Crown",
    category: "Username",
    transform: wrap("♛ ", " ♛"),
  },
  {
    name: "Username Minimal",
    category: "Username",
    transform: wrap("• ", " •"),
  },

  /* Symbols */
  {
    name: "Hearts",
    category: "Symbols",
    transform: wrap("♥ ", " ♥"),
  },
  {
    name: "Stars",
    category: "Symbols",
    transform: wrap("★ ", " ★"),
  },
  {
    name: "Arrows",
    category: "Symbols",
    transform: wrap("➜ ", " ➜"),
  },
  {
    name: "Flowers",
    category: "Symbols",
    transform: wrap("❀ ", " ❀"),
  },
  {
    name: "Crowns",
    category: "Symbols",
    transform: wrap("♛ ", " ♛"),
  },
  {
    name: "Music",
    category: "Symbols",
    transform: wrap("♫ ", " ♫"),
  },
  {
    name: "Weather",
    category: "Symbols",
    transform: wrap("☀ ", " ☁"),
  },
  {
    name: "Zodiac",
    category: "Symbols",
    transform: wrap("♈ ", " ♓"),
  },
  {
    name: "Currency",
    category: "Symbols",
    transform: wrap("$ ", " $"),
  },
  {
    name: "Gaming",
    category: "Symbols",
    transform: wrap("🎮 ", " 🎮"),
  },
  {
    name: "Chess",
    category: "Symbols",
    transform: wrap("♔ ", " ♛"),
  },
  {
    name: "Cards",
    category: "Symbols",
    transform: wrap("♠ ", " ♥"),
  },
  {
    name: "Math",
    category: "Symbols",
    transform: wrap("∑ ", " ∞"),
  },
  {
    name: "Greek",
    category: "Symbols",
    transform: wrap("α ", " Ω"),
  },
  {
    name: "Technical",
    category: "Symbols",
    transform: wrap("⌘ ", " ⌘"),
  },
  {
    name: "Dingbats",
    category: "Symbols",
    transform: wrap("✪ ", " ✪"),
  },
  {
    name: "Box Drawing",
    category: "Symbols",
    transform: wrap("╭─ ", " ─╮"),
  },
  {
    name: "Geometric Shapes",
    category: "Symbols",
    transform: wrap("◆ ", " ◇"),
  },
];

/* -------------------------------------------------------------------------- */
/* DECORATIONS                                                                */
/* -------------------------------------------------------------------------- */

const decorations = [
  {
    name: "Stars",
    category: "Symbols" as const,
    before: "✦ ",
    after: " ✦",
  },
  {
    name: "Sparkles",
    category: "Aesthetic" as const,
    before: "✧ ",
    after: " ✧",
  },
  {
    name: "Wings",
    category: "Gaming" as const,
    before: "꧁ ",
    after: " ꧂",
  },
  {
    name: "Diamonds",
    category: "Decorative" as const,
    before: "◈ ",
    after: " ◈",
  },
  {
    name: "Cute Bows",
    category: "Cute" as const,
    before: "୨୧ ",
    after: " ୨୧",
  },
  {
    name: "Soft Hearts",
    category: "Cute" as const,
    before: "♥ ",
    after: " ♥",
  },
  {
    name: "Wave",
    category: "Aesthetic" as const,
    before: "〜 ",
    after: " 〜",
  },
  {
    name: "Gaming Tags",
    category: "Username" as const,
    before: "乂 ",
    after: " 乂",
  },
  {
    name: "Crown",
    category: "Gaming" as const,
    before: "♛ ",
    after: " ♛",
  },
  {
    name: "Minimal Dots",
    category: "Popular" as const,
    before: "· ",
    after: " ·",
  },
];

/* -------------------------------------------------------------------------- */
/* FINAL FONT LIBRARY                                                         */
/* -------------------------------------------------------------------------- */

export const fontStyles: FontStyle[] = [
  ...baseStyles.map((style, index) => ({
    ...style,
    id: `style-${index + 1}`,
  })),

  ...extendedStyles.map((style, index) => ({
    ...style,
    id: `extended-${index + 1}`,
  })),

  ...baseStyles.slice(0, 12).flatMap((style, styleIndex) =>
    decorations.map((decoration, decorationIndex) => ({
      id: `decorated-${styleIndex + 1}-${decorationIndex + 1}`,
      name: `${decoration.name} ${style.name}`,
      category: decoration.category,
      transform: (text: string) =>
        `${decoration.before}${style.transform(text)}${decoration.after}`,
    })),
  ),
];

export function transformText(text: string, style: FontStyle) {
  return style.transform(text);
}