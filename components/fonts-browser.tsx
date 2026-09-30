"use client";

import { useState } from "react";
import { FontExplorer } from "@/components/font-explorer";
import { RealFontLibrary } from "@/components/real-font-library";

type FontsView = "unicode" | "real";

export function FontsBrowser() {
  const [view, setView] = useState<FontsView>("unicode");

  return (
    <div className="fonts-browser">
      <div className="fonts-view-tabs" role="group" aria-label="Font browsing mode">
        <button
          className={`fonts-view-tab ${view === "unicode" ? "is-active" : ""}`}
          type="button"
          aria-pressed={view === "unicode"}
          onClick={() => setView("unicode")}
        >
          Unicode Styles
        </button>
        <button
          className={`fonts-view-tab ${view === "real" ? "is-active" : ""}`}
          type="button"
          aria-pressed={view === "real"}
          onClick={() => setView("real")}
        >
          Real Fonts
        </button>
      </div>
      {view === "unicode"
        ? <FontExplorer mode="library" initialText="Fancy fonts" />
        : <RealFontLibrary />}
    </div>
  );
}