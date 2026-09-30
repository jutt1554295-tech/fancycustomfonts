"use client";

import { useDeferredValue, useId, useState } from "react";
import { categories, fontStyles, type FontCategory } from "@/lib/fonts";

type FontExplorerProps = {
  mode: "generator" | "library";
  initialText?: string;
};

export function FontExplorer({ mode, initialText = "Make it yours" }: FontExplorerProps) {
  const isLibrary = mode === "library";
  const inputId = useId();
  const searchId = useId();
  const [text, setText] = useState(initialText);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FontCategory>("All");
  const [visibleCount, setVisibleCount] = useState(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredStyles = fontStyles.filter((style) => {
    const matchesCategory = activeCategory === "All"
      || (activeCategory === "Popular" && (style.category === "Popular" || style.id.startsWith("style-")))
      || style.category === activeCategory;
    const matchesSearch = !deferredSearch
      || style.name.toLowerCase().includes(deferredSearch)
      || style.category.toLowerCase().includes(deferredSearch);
    return matchesCategory && matchesSearch;
  });
  const visibleStyles = filteredStyles.slice(0, isLibrary ? visibleCount : 12);

  async function copyStyle(styleId: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(styleId);
      window.setTimeout(() => setCopiedId((current) => current === styleId ? null : current), 1600);
    } catch {
      setCopiedId(`error-${styleId}`);
      window.setTimeout(() => setCopiedId(null), 2200);
    }
  }

  return (
    <section className={`explorer ${isLibrary ? "explorer-library" : "explorer-generator"}`} id={isLibrary ? "font-library" : "generator"}>
      <div className="explorer-topline">
        <div>
          <span className="eyebrow"><span className="status-dot" /> Unicode text studio</span>
          <h2>{isLibrary ? "Find your look" : "Your words, reimagined"}</h2>
        </div>
        <p className="result-count">{fontStyles.length}+ styles <span aria-hidden="true">↗</span></p>
      </div>

      <div className="input-panel glass-panel">
        <div className="input-label-row">
          <label htmlFor={inputId}>Your text</label>
          <span>{text.length}/120</span>
        </div>
        <textarea
          id={inputId}
          className="text-input"
          value={text}
          maxLength={120}
          rows={isLibrary ? 2 : 3}
          placeholder="Type something worth sharing..."
          onChange={(event) => setText(event.target.value)}
        />
        <div className="input-actions">
          <span className="input-hint">Your text stays in this browser</span>
          <button className="text-action" type="button" onClick={() => setText("")} disabled={!text}>
            Clear text <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      <div className="style-controls">
        <div className="search-field">
          <label className="sr-only" htmlFor={searchId}>Search font styles</label>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id={searchId}
            type="search"
            value={search}
            placeholder="Search styles..."
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && <button type="button" aria-label="Clear style search" onClick={() => setSearch("")}>×</button>}
        </div>
        <p className="match-count" aria-live="polite">{filteredStyles.length} styles</p>
      </div>

      <div className="category-scroll" aria-label="Filter styles by category">
        <div className="category-list" role="group" aria-label="Style categories">
          {categories.map((category) => (
            <button
              className={`category-chip ${activeCategory === category ? "is-active" : ""}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleStyles.length > 0 ? (
        <div className={`style-grid ${isLibrary ? "style-grid-large" : "style-grid-featured"}`}>
          {visibleStyles.map((style) => {
            const transformed = style.transform(text || "Your text");
            const didCopy = copiedId === style.id;
            const copyFailed = copiedId === `error-${style.id}`;
            return (
              <article className="style-card glass-panel" key={style.id}>
                <div className="style-card-meta">
                  <span className="style-category">{style.category}</span>
                  <span className="style-name">{style.name}</span>
                </div>
                <p className="style-preview" title={transformed}>{transformed}</p>
                <button
                  type="button"
                  className={`copy-button ${didCopy ? "is-copied" : ""}`}
                  aria-label={`${didCopy ? "Copied" : "Copy"} ${style.name}`}
                  onClick={() => copyStyle(style.id, transformed)}
                >
                  <span aria-hidden="true">{didCopy ? "✓" : "⧉"}</span>
                  {didCopy ? "Copied" : copyFailed ? "Copy unavailable" : "Copy style"}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state glass-panel">
          <span aria-hidden="true">⌕</span>
          <h3>No styles found</h3>
          <p>Try another search or choose a different category</p>
          <button className="text-action" type="button" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
            Reset filters
          </button>
        </div>
      )}

      {isLibrary && visibleCount < filteredStyles.length && (
        <div className="load-more-wrap">
          <button className="secondary-button" type="button" onClick={() => setVisibleCount((count) => count + 30)}>
            Load more styles <span aria-hidden="true">↓</span>
          </button>
          <span>Showing {visibleStyles.length} of {filteredStyles.length}</span>
        </div>
      )}
      {!isLibrary && (
        <a className="explore-all-link" href="/fonts">Explore all {fontStyles.length}+ styles <span aria-hidden="true">↗</span></a>
      )}
      <p className="unicode-note">These are Unicode text transformations, not installed fonts. Some characters may look different across apps and devices.</p>
    </section>
  );
}