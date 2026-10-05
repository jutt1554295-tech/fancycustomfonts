"use client";

import { FontExplorer } from "@/components/font-explorer";

export function FontsBrowser() {
  return (
    <div className="fonts-browser">
      <FontExplorer mode="library" initialText="Fancy fonts" />
    </div>
  );
}