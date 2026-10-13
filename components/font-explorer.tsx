"use client";

import { useDeferredValue, useId, useState } from "react";
import { categories, fontStyles, type FontCategory } from "@/lib/fonts";

type FontExplorerProps = {
  mode: "generator" | "library";
  initialText?: string;
};

type ExplorerCategory = FontCategory | "Gun & Rifles";

const frakturUpper = Array.from(
  "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ"
);

const frakturLower = Array.from(
  "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
);

function toFraktur(value: string) {
  return Array.from(value)
    .map((character) => {
      const code = character.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return frakturUpper[code - 65] ?? character;
      }

      if (code >= 97 && code <= 122) {
        return frakturLower[code - 97] ?? character;
      }

      return character;
    })
    .join("");
}

const gunDesigns = [
  {
    id: "gun-01",
    name: "Classic Rifle",
    description: "A long rifle-inspired text design.",
    build: (name: string) => `︻╦══〔${name}〕══╤──`,
  },
  {
    id: "gun-02",
    name: "Long Rifle",
    description: "An extended frame with the name inside.",
    build: (name: string) => `━━╤═『${name}』═╦══`,
  },
  {
    id: "gun-03",
    name: "Scope Frame",
    description: "A compact scope-inspired name frame.",
    build: (name: string) => `╾━╤══【${name}】══╦─`,
  },
  {
    id: "gun-04",
    name: "Magazine Frame",
    description: "A boxed label in a gun-inspired shape.",
    build: (name: string) => `╔══╦═〔${name}〕═╤══╗`,
  },
  {
    id: "gun-05",
    name: "Tactical Rifle",
    description: "A decorated frame around your name.",
    build: (name: string) => `╞═╦══⟦${name}⟧══╤─`,
  },
  {
    id: "gun-06",
    name: "Extended Rifle",
    description: "A longer horizontal gun-style pattern.",
    build: (name: string) => `︻╦╦══〈${name}〉═══╤──`,
  },
  {
    id: "gun-07",
    name: "Receiver Frame",
    description: "A framed name in the central body.",
    build: (name: string) => `╾══╣〔${name}〕╠══─`,
  },
  {
    id: "gun-08",
    name: "Compact Frame",
    description: "A shorter design for gaming names.",
    build: (name: string) => `╔═╤═《${name}》═╦══╝`,
  },
  {
    id: "gun-09",
    name: "Gamer Rifle",
    description: "A decorated rifle-style text design.",
    build: (name: string) => `乂︻╦══『${name}』══╤──乂`,
  },
];

export function FontExplorer({
  mode,
  initialText = "Make it yours",
}: FontExplorerProps) {
  const isLibrary = mode === "library";
  const inputId = useId();
  const searchId = useId();

  const [text, setText] = useState(initialText);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<ExplorerCategory>("All");
  const [visibleCount, setVisibleCount] = useState(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const isGunCategory = activeCategory === "Gun & Rifles";

  const gunName = toFraktur(
    (text.trim() || "YOUR NAME").replace(/\s+/g, " ").slice(0, 18)
  );

  const filteredStyles = fontStyles.filter((style) => {
    const matchesCategory =
      activeCategory === "Gun & Rifles"
        ? false
        : activeCategory === "All"
          ? true
          : activeCategory === "Popular"
            ? style.category === "Popular" ||
              style.id.startsWith("style-")
            : style.category === activeCategory;

    const matchesSearch =
      !deferredSearch ||
      style.name.toLowerCase().includes(deferredSearch) ||
      style.category.toLowerCase().includes(deferredSearch);

    return matchesCategory && matchesSearch;
  });

  const filteredGunDesigns = gunDesigns.filter(
    (design) =>
      !deferredSearch ||
      design.name.toLowerCase().includes(deferredSearch) ||
      design.description.toLowerCase().includes(deferredSearch)
  );

  const visibleStyles = filteredStyles.slice(
    0,
    isLibrary ? visibleCount : 12
  );

  async function copyStyle(styleId: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(styleId);

      window.setTimeout(
        () =>
          setCopiedId((current) =>
            current === styleId ? null : current
          ),
        1600
      );
    } catch {
      setCopiedId(`error-${styleId}`);

      window.setTimeout(() => setCopiedId(null), 2200);
    }
  }

  return (
    <section
      className={`explorer ${
        isLibrary ? "explorer-library" : "explorer-generator"
      }`}
      id={isLibrary ? "font-library" : "generator"}
    >
      <div className="explorer-topline">
        <div>
          <span className="eyebrow">Unicode text studio</span>

          <h2>
            {isGunCategory
              ? "Gun & Rifles"
              : isLibrary
                ? "Find your look"
                : "Your words, Reimagined"}
          </h2>
        </div>

        <p className="result-count">
          {isGunCategory
            ? `${gunDesigns.length} gun designs`
            : `${fontStyles.length}+ styles`}{" "}
          <span aria-hidden="true">↗</span>
        </p>
      </div>

      <div className="input-panel glass-panel">
        <div className="input-label-row">
          <label htmlFor={inputId}>
            {isGunCategory ? "Text to Transform" : "Text to Transform"}
          </label>

          <span>{text.length}/120</span>
        </div>

        <textarea
          id={inputId}
          className="text-input"
          value={text}
          maxLength={120}
          rows={isLibrary ? 2 : 3}
          placeholder={
            isGunCategory
              ? "Enter your gaming name..."
              : "Type something worth sharing..."
          }
          onChange={(event) => setText(event.target.value)}
        />

        <div className="input-actions">
          <span className="input-hint">
            {isGunCategory
              ? "Your text stays in this browser"
              : "Your text stays in this browser"}
          </span>

          <button
            className="text-action"
            type="button"
            onClick={() => setText("")}
            disabled={!text}
          >
            Clear text <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      <div className="style-controls">
        <div className="search-field">
          <label className="sr-only" htmlFor={searchId}>
            {isGunCategory ? "Search gun designs" : "Search font styles"}
          </label>

          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            id={searchId}
            type="search"
            value={search}
            placeholder={
              isGunCategory ? "Search styles..." : "Search styles..."
            }
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <p className="match-count" aria-live="polite">
          {isGunCategory
            ? `${filteredGunDesigns.length} designs`
            : `${filteredStyles.length} styles`}
        </p>
      </div>

      <div className="category-scroll" aria-label="Filter styles by category">
        <div className="category-list" role="group" aria-label="Style categories">
          {categories.map((category) => (
            <button
              className={`category-chip ${
                activeCategory === category ? "is-active" : ""
              }`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

          <button
            className={`category-chip ${
              isGunCategory ? "is-active" : ""
            }`}
            type="button"
            aria-pressed={isGunCategory}
            onClick={() => setActiveCategory("Gun & Rifles")}
          >
            Gun &amp; Rifles
          </button>
        </div>
      </div>

      {isGunCategory ? (
        filteredGunDesigns.length > 0 ? (
          <div
            className={`style-grid ${
              isLibrary ? "style-grid-large" : "style-grid-featured"
            }`}
          >
            {filteredGunDesigns.map((design, index) => {
              const transformed = design.build(gunName);
              const didCopy = copiedId === design.id;
              const copyFailed = copiedId === `error-${design.id}`;

              return (
                <article
                  className="style-card glass-panel"
                  key={design.id}
                >
                  <div className="style-card-meta">
                    <span className="style-category">
                      Gun Style {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="style-name">{design.name}</span>
                  </div>

                  <p className="style-preview gun-rifles-style-preview">
                    {transformed}
                  </p>

                  <button
                    type="button"
                    className={`copy-button ${
                      didCopy ? "is-copied" : ""
                    }`}
                    aria-label={`Copy ${design.name}`}
                    onClick={() => copyStyle(design.id, transformed)}
                  >
                    <span aria-hidden="true">
                      {didCopy ? "✓" : "⧉"}
                    </span>

                    {didCopy
                      ? "Copied"
                      : copyFailed
                        ? "Copy unavailable"
                        : "Copy design"}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state glass-panel">
            <span aria-hidden="true">⌕</span>
            <h3>No gun designs found</h3>
            <p>Try another search.</p>

            <button
              className="text-action"
              type="button"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )
      ) : visibleStyles.length > 0 ? (
        <div
          className={`style-grid ${
            isLibrary ? "style-grid-large" : "style-grid-featured"
          }`}
        >
          {visibleStyles.map((style) => {
            const transformed = style.transform(text || "Your text");
            const didCopy = copiedId === style.id;
            const copyFailed = copiedId === `error-${style.id}`;

            return (
              <article
                className="style-card glass-panel"
                key={style.id}
              >
                <div className="style-card-meta">
                  <span className="style-category">{style.category}</span>
                  <span className="style-name">{style.name}</span>
                </div>

                <p className="style-preview" title={transformed}>
                  {transformed}
                </p>

                <button
                  type="button"
                  className={`copy-button ${
                    didCopy ? "is-copied" : ""
                  }`}
                  aria-label={`${didCopy ? "Copied" : "Copy"} ${style.name}`}
                  onClick={() => copyStyle(style.id, transformed)}
                >
                  <span aria-hidden="true">
                    {didCopy ? "✓" : "⧉"}
                  </span>

                  {didCopy
                    ? "Copied"
                    : copyFailed
                      ? "Copy unavailable"
                      : "Copy style"}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state glass-panel">
          <span aria-hidden="true">⌕</span>
          <h3>No styles found</h3>
          <p>Try another search or choose a different category.</p>

          <button
            className="text-action"
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {isLibrary &&
        !isGunCategory &&
        visibleCount < filteredStyles.length && (
          <div className="load-more-wrap">
            <button
              className="secondary-button"
              type="button"
              onClick={() => setVisibleCount((count) => count + 30)}
            >
              Load more styles <span aria-hidden="true">↓</span>
            </button>

            <span>
              Showing {visibleStyles.length} of {filteredStyles.length}
            </span>
          </div>
        )}

      {!isLibrary && !isGunCategory && (
        <a className="explore-all-link" href="/fonts">
          Explore all {fontStyles.length}+ styles{" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}

      <p className="unicode-note">
        {isGunCategory
          ? "These are decorative gun-inspired text designs, not realistic gun illustrations. Unicode symbols can appear differently across games and devices."
          : "These are Unicode text transformations, not installed fonts. Some characters may look different across apps and devices."}
      </p>
    </section>
  );
}