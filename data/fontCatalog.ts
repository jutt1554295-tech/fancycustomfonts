export const realFontCategories = [
  "All",
  "Bubble",
  "Cartoon",
  "Chunky",
  "Groovy",
  "Retro",
  "Script",
  "Handwritten",
  "Handwritten & Calligraphy",
  "Cute",
  "Gaming",
  "Futuristic",
  "Decorative",
  "Display",
  "Kids",
] as const;

export type RealFontCategory = Exclude<(typeof realFontCategories)[number], "All">;
export type FontFallback = "cursive" | "sans-serif" | "serif" | "monospace";
export type FontLicense = { name: string; source: string };

export type RealFont = {
  id: string;
  name: string;
  category: RealFontCategory;
  fontFamily: string;
  filePath: string;
  tags: readonly string[];
  description: string;
  featured: boolean;
  available: boolean;
  fallback: FontFallback;
  license?: FontLicense;
  fontWeightRange?: string;
};

const font = (
  id: string,
  name: string,
  category: RealFontCategory,
  tags: readonly string[],
  description: string,
  fallback: FontFallback = "sans-serif",
  featured = false,
  license?: FontLicense,
  available = false,
  fontWeightRange?: string,
): RealFont => ({
  id,
  name,
  category,
  fontFamily: name,
  filePath: `/fonts/${id}.woff2`,
  tags,
  description,
  featured,
  available,
  fallback,
  ...(license ? { license } : {}),
  ...(fontWeightRange ? { fontWeightRange } : {}),
});

const googleFontsOfl = (family: string): FontLicense => ({
  name: "SIL Open Font License 1.1",
  source: `https://github.com/google/fonts/blob/main/ofl/${family}/OFL.txt`,
});

export const fontCatalog: readonly RealFont[] = [
  font("bubblegum-sans", "Bubblegum Sans", "Bubble", ["bubble", "rounded", "cute", "kids"], "A soft, rounded display face for cheerful short messages.", "cursive", true),
  font("chewy", "Chewy", "Cartoon", ["cartoon", "playful", "kids", "chunky"], "A playful hand-drawn style for friendly titles and names.", "cursive", true),
  font("fredoka", "Fredoka", "Chunky", ["rounded", "bold", "friendly", "kids"], "A bold rounded look with a welcoming feel.", "sans-serif", true),
  font("baloo-2", "Baloo 2", "Chunky", ["rounded", "bold", "soft", "kids"], "A broad, rounded display style for expressive headings.", "sans-serif", true),
  font("lilita-one", "Lilita One", "Chunky", ["bold", "display", "cartoon", "heavy"], "A compact heavy face that gives short text a strong silhouette.", "sans-serif"),
  font("modak", "Modak", "Bubble", ["bubble", "soft", "display", "cute"], "An oversized bubble style suited to brief, playful text.", "cursive"),
  font("chango", "Chango", "Cartoon", ["cartoon", "bold", "playful", "display"], "A lively display face with an energetic, hand-drawn character.", "sans-serif"),
  font("chicle", "Chicle", "Bubble", ["bubble", "retro", "playful", "display"], "A rounded retro style for short names and colorful headings.", "cursive"),
  font("coiny", "Coiny", "Chunky", ["chunky", "cartoon", "bold", "playful"], "A dense display style that gives short words a solid look.", "sans-serif"),
  font("fascinate", "Fascinate", "Decorative", ["ornamental", "display", "decorative", "retro"], "An ornamental display face for brief decorative treatments.", "serif"),
  font("bungee", "Bungee", "Gaming", ["gaming", "urban", "bold", "display"], "A strong geometric style for game tags and compact titles.", "sans-serif", true),
  font("titan-one", "Titan One", "Chunky", ["heavy", "bold", "display", "gaming"], "A rounded heavyweight style for bold, compact lettering.", "sans-serif"),
  font("luckiest-guy", "Luckiest Guy", "Cartoon", ["cartoon", "comic", "bold", "playful"], "A comic-inspired display style for upbeat titles.", "cursive"),
  font("black-ops-one", "Black Ops One", "Gaming", ["gaming", "military", "bold", "display"], "A rugged display style for game names and action-themed text.", "sans-serif", true),
  font("press-start-2p", "Press Start 2P", "Gaming", ["gaming", "pixel", "retro", "arcade"], "A pixel-inspired style for retro game names and short labels.", "monospace", true),
  font("audiowide", "Audiowide", "Futuristic", ["tech", "modern", "gaming", "geometric"], "A smooth futuristic style for tech and gaming identities.", "sans-serif"),
  font("orbitron", "Orbitron", "Futuristic", ["sci-fi", "tech", "gaming", "space"], "A geometric science-fiction style for names and headings.", "sans-serif", true),
  font("righteous", "Righteous", "Groovy", ["retro", "rounded", "geometric", "display"], "A smooth retro display style with rounded geometric forms.", "sans-serif"),
  font("unbounded", "Unbounded", "Futuristic", ["wide", "modern", "tech", "display"], "A wide contemporary style for expressive display text.", "sans-serif"),
  font("monoton", "Monoton", "Retro", ["retro", "neon", "decorative", "display"], "A lined retro display style for short decorative phrases.", "sans-serif"),
  font("lobster", "Lobster", "Script", ["script", "retro", "smooth", "display", "brush script", "handwritten & calligraphy"], "A flowing connected style for names and short greetings.", "cursive", true),
  font("pacifico", "Pacifico", "Script", ["script", "casual", "handwritten", "friendly", "brush script", "casual handwriting", "handwritten & calligraphy"], "A relaxed brush-script look for informal profile text.", "cursive"),
  font("satisfy", "Satisfy", "Script", ["script", "handwritten", "smooth", "signature", "monoline", "handwritten & calligraphy"], "A light connected script for names and short notes.", "cursive"),
  font("great-vibes", "Great Vibes", "Script", ["script", "formal", "elegant", "signature", "modern calligraphy", "wedding script", "luxury", "handwritten & calligraphy"], "An elegant calligraphic style for names and invitations.", "cursive"),
  font("caveat", "Caveat", "Handwritten", ["handwritten", "casual", "note", "script", "casual handwriting", "handwritten & calligraphy"], "A casual handwritten style for notes and friendly messages.", "cursive", true),
  font("permanent-marker", "Permanent Marker", "Handwritten", ["marker", "handwritten", "bold", "casual"], "A bold marker-like style for short expressive words.", "cursive"),
  font("rock-salt", "Rock Salt", "Handwritten", ["handwritten", "rough", "marker", "display"], "A textured handwritten style for distinctive short labels.", "cursive"),
  font("bebas-neue", "Bebas Neue", "Display", ["condensed", "bold", "poster", "uppercase"], "A tall condensed display style for strong short headings.", "sans-serif", true),
  font("anton", "Anton", "Display", ["condensed", "heavy", "bold", "poster"], "A compact heavy style for high-impact titles and names.", "sans-serif"),
  font("oswald", "Oswald", "Display", ["condensed", "clean", "bold", "modern"], "A condensed sans style for clear headlines and labels.", "sans-serif"),
  font("dancing-script", "Dancing Script", "Handwritten & Calligraphy", ["script", "handwritten", "modern calligraphy", "casual handwriting", "flowing", "connected"], "A lively connected script with a natural handwritten rhythm.", "cursive", true, googleFontsOfl("dancingscript"), true, "400 700"),
  font("sacramento", "Sacramento", "Handwritten & Calligraphy", ["signature", "script", "monoline", "elegant", "handwritten"], "A fine monoline script inspired by personal signatures.", "cursive", true, googleFontsOfl("sacramento"), true),
  font("allura", "Allura", "Handwritten & Calligraphy", ["elegant", "luxury", "wedding script", "calligraphy", "script"], "A graceful calligraphic script for elegant names and invitations.", "cursive", true, googleFontsOfl("allura"), true),
  font("parisienne", "Parisienne", "Handwritten & Calligraphy", ["elegant", "wedding script", "signature", "calligraphy", "script"], "A refined flowing script for wedding stationery and signatures.", "cursive", false, googleFontsOfl("parisienne"), true),
  font("alex-brush", "Alex Brush", "Handwritten & Calligraphy", ["brush script", "signature", "elegant", "calligraphy", "script"], "A connected brush script with expressive, sweeping strokes.", "cursive", true, googleFontsOfl("alexbrush"), true),
  font("marck-script", "Marck Script", "Handwritten & Calligraphy", ["casual handwriting", "handwritten", "script", "flowing", "signature"], "A relaxed handwritten script with a personal note-like feel.", "cursive", false, googleFontsOfl("marckscript"), true),
];

export type FontLibraryCollections = {
  favoriteIds: string[];
  recentlyViewedIds: string[];
};

export const emptyFontLibraryCollections: FontLibraryCollections = {
  favoriteIds: [],
  recentlyViewedIds: [],
};
