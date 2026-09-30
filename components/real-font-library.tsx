"use client";

import { useDeferredValue, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  emptyFontLibraryCollections,
  fontCatalog,
  realFontCategories,
  type FontLibraryCollections,
  type RealFont,
  type RealFontCategory,
} from "@/data/fontCatalog";
import { fontFaceRules, fontFamilyStack } from "@/lib/font-assets";

export function RealFontLibrary() {
  const inputId = useId();
  const searchId = useId();
  const [text, setText] = useState("FancyCustomFonts");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof realFontCategories)[number]>("All");
  const [previewingFontId, setPreviewingFontId] = useState<string | null>(null);
  const [copiedFontId, setCopiedFontId] = useState<string | null>(null);
  const [loadedFontIds, setLoadedFontIds] = useState<string[]>([]);
  const [collections, setCollections] = useState<FontLibraryCollections>(emptyFontLibraryCollections);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredFonts = fontCatalog
    .filter((font) => {
      const matchesCategory = activeCategory === "All"
        || font.category === activeCategory
        || (activeCategory === "Handwritten & Calligraphy" && font.tags.includes("handwritten & calligraphy"));
      const matchesSearch = !deferredSearch
        || font.name.toLowerCase().includes(deferredSearch)
        || font.category.toLowerCase().includes(deferredSearch)
        || font.tags.some((tag) => tag.toLowerCase().includes(deferredSearch));
      return matchesCategory && matchesSearch;
    })
    .sort((left, right) => Number(right.featured) - Number(left.featured));

  const availableFontIds = filteredFonts.filter((font) => font.available).map((font) => font.id).join("|");

  useEffect(() => {
    if (!availableFontIds || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      const newlyVisible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => (entry.target as HTMLElement).dataset.fontId)
        .filter((id): id is string => Boolean(id));
      if (newlyVisible.length) {
        setLoadedFontIds((current) => [...new Set([...current, ...newlyVisible])]);
      }
    }, { rootMargin: "300px 0px" });

    availableFontIds.split("|").forEach((id) => {
      const node = cardRefs.current.get(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [availableFontIds]);

  const faceCss = fontFaceRules(
    filteredFonts.filter((font) => loadedFontIds.includes(font.id)),
  );

  async function copyText(fontId: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFontId(fontId);
      window.setTimeout(() => setCopiedFontId((current) => current === fontId ? null : current), 1500);
    } catch {
      setCopiedFontId(`error-${fontId}`);
      window.setTimeout(() => setCopiedFontId(null), 2000);
    }
  }

  function togglePreview(font: RealFont) {
    const opening = previewingFontId !== font.id;
    setPreviewingFontId(opening ? font.id : null);
    if (opening) {
      setCollections((current) => ({
        ...current,
        recentlyViewedIds: [font.id, ...current.recentlyViewedIds.filter((id) => id !== font.id)].slice(0, 8),
      }));
    }
  }

  function toggleFavorite(fontId: string) {
    setCollections((current) => ({
      ...current,
      favoriteIds: current.favoriteIds.includes(fontId)
        ? current.favoriteIds.filter((id) => id !== fontId)
        : [...current.favoriteIds, fontId],
    }));
  }

  const fontStyle = (font: RealFont): CSSProperties => ({
    fontFamily: fontFamilyStack(font),
    fontWeight: font.fontWeightRange ? 600 : 400,
  });

  return (
    <section className="real-font-library" aria-labelledby="real-fonts-heading">
      {faceCss && <style>{faceCss}</style>}
      <div className="real-font-input glass-panel">
        <div className="real-font-input-heading">
          <label htmlFor={inputId}>Live font preview</label>
          <span>{text.length}/100</span>
        </div>
        <input
          id={inputId}
          type="text"
          value={text}
          maxLength={100}
          placeholder="Type your text..."
          onChange={(event) => setText(event.target.value)}
        />
      </div>

      <p className="real-font-fallback-note">
        Previews use licensed local font files where available and system fallbacks for the rest. Your typed text stays unchanged.
      </p>

      <div className="real-font-controls">
        <div className="search-field real-font-search">
          <label className="sr-only" htmlFor={searchId}>Search real fonts by name, category or tag</label>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id={searchId}
            type="search"
            value={search}
            placeholder="Search fonts..."
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && <button type="button" aria-label="Clear font search" onClick={() => setSearch("")}>×</button>}
        </div>
        <p className="real-font-count" aria-live="polite">{filteredFonts.length} fonts</p>
      </div>

      <div className="real-font-category-scroll" aria-label="Filter real fonts by category">
        <div className="real-font-categories" role="group" aria-label="Real font categories">
          {realFontCategories.map((category) => (
            <button
              className={`real-font-category ${activeCategory === category ? "is-active" : ""}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category as RealFontCategory | "All")}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="real-font-results-heading">
        <h2 id="real-fonts-heading">Featured fonts</h2>
        <span>Browse {fontCatalog.length} font families</span>
      </div>

      {filteredFonts.length ? (
        <div className="real-font-grid">
          {filteredFonts.map((font) => {
            const isPreviewing = previewingFontId === font.id;
            const isFavorite = collections.favoriteIds.includes(font.id);
            const isRecent = collections.recentlyViewedIds.includes(font.id);
            const isCopied = copiedFontId === font.id;
            const copyFailed = copiedFontId === `error-${font.id}`;

            return (
              <article
                className={`real-font-card glass-panel ${isPreviewing ? "is-previewing" : ""}`}
                key={font.id}
                data-font-id={font.id}
                ref={(node) => {
                  if (node) cardRefs.current.set(font.id, node);
                  else cardRefs.current.delete(font.id);
                }}
              >
                <div className="real-font-card-heading">
                  <div className="real-font-name-group">
                    <h3>{font.name}</h3>
                    <span className="real-font-category-label">{font.category}</span>
                  </div>
                  <div className="real-font-badges">
                    {font.featured && <span className="real-font-featured">Featured</span>}
                    {isRecent && <span className="real-font-recent">Recently previewed</span>}
                    {font.license && <span className="real-font-license" title={font.license.source}>OFL 1.1</span>}
                    <button
                      className={`real-font-favorite ${isFavorite ? "is-favorite" : ""}`}
                      type="button"
                      aria-label={`${isFavorite ? "Remove" : "Add"} ${font.name} ${isFavorite ? "from" : "to"} favorites`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(font.id)}
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                </div>
                <p className="real-font-description">{font.description}</p>
                <div className="real-font-tags" aria-label={`${font.name} tags`}>
                  {font.tags.map((tag) => <span className="real-font-tag" key={tag}>{tag}</span>)}
                </div>
                <div className="real-font-preview-stage">
                  <p className="real-font-preview" style={fontStyle(font)}>{text || "Fancy text"}</p>
                  {isPreviewing && <p className="real-font-sample" style={fontStyle(font)}>Aa Bb Cc 012345</p>}
                </div>
                <div className="real-font-actions">
                  <button className="real-font-action" type="button" onClick={() => copyText(font.id)}>
                    {isCopied ? "Copied" : copyFailed ? "Copy unavailable" : "Copy text"}
                  </button>
                  <button className="real-font-action real-font-preview-action" type="button" aria-pressed={isPreviewing} onClick={() => togglePreview(font)}>
                    {isPreviewing ? "Close preview" : "Preview"}
                  </button>
                  {font.available && (
                    <button className="real-font-action real-font-use-action" type="button" onClick={() => setPreviewingFontId(font.id)}>
                      Use Font
                    </button>
                  )}
                </div>
                {!font.available && <p className="real-font-unavailable">Licensed font file not added yet</p>}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="real-font-empty glass-panel">
          <h3>No matching fonts</h3>
          <p>Try another font name, category or tag</p>
          <button className="real-font-action" type="button" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Reset filters</button>
        </div>
      )}
    </section>
  );
}