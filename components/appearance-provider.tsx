"use client";

import { createContext, startTransition, useContext, useEffect, useState, type ReactNode } from "react";
import {
  appearanceStorageKey,
  defaultAppearance,
  getAppearanceVariables,
  normalizeAppearance,
  resolveTheme,
  type AppearancePreferences,
  type ResolvedTheme,
} from "@/lib/appearance";

type PreferenceKey = keyof AppearancePreferences;

type AppearanceContextValue = {
  preferences: AppearancePreferences;
  updatePreference: <Key extends PreferenceKey>(key: Key, value: AppearancePreferences[Key]) => void;
  resetAppearance: () => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

function applyAppearance(preferences: AppearancePreferences, theme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  Object.entries(getAppearanceVariables(preferences, theme)).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

function persistAppearance(preferences: AppearancePreferences) {
  const variables = {
    dark: getAppearanceVariables(preferences, "dark"),
    light: getAppearanceVariables(preferences, "light"),
  };

  try {
    localStorage.setItem(appearanceStorageKey, JSON.stringify({ preferences, variables }));
  } catch {
    // The current session still works when storage is unavailable.
  }
}

function readAppearance() {
  try {
    const stored = localStorage.getItem(appearanceStorageKey);
    return stored ? normalizeAppearance(JSON.parse(stored)) : { ...defaultAppearance };
  } catch {
    return { ...defaultAppearance };
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AppearancePreferences>({ ...defaultAppearance });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = readAppearance();
    const resolved = resolveTheme(
      saved.mode,
      window.matchMedia("(prefers-color-scheme: light)").matches,
    );
    applyAppearance(saved, resolved);
    startTransition(() => {
      setPreferences(saved);
      setResolvedTheme(resolved);
      setInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!initialized) return;
    applyAppearance(preferences, resolvedTheme);
    persistAppearance(preferences);
  }, [initialized, preferences, resolvedTheme]);

  useEffect(() => {
    if (!initialized || preferences.mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (event: MediaQueryListEvent) => {
      const theme = resolveTheme("system", event.matches);
      setResolvedTheme(theme);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [initialized, preferences.mode]);

  function updatePreference<Key extends PreferenceKey>(key: Key, value: AppearancePreferences[Key]) {
    const next = normalizeAppearance({ ...preferences, [key]: value });
    const resolved = resolveTheme(
      next.mode,
      window.matchMedia("(prefers-color-scheme: light)").matches,
    );
    setPreferences(next);
    setResolvedTheme(resolved);
    applyAppearance(next, resolved);
    persistAppearance(next);
  }

  function resetAppearance() {
    const next = { ...defaultAppearance };
    const resolved = resolveTheme(
      next.mode,
      window.matchMedia("(prefers-color-scheme: light)").matches,
    );
    setPreferences(next);
    setResolvedTheme(resolved);
    applyAppearance(next, resolved);
    persistAppearance(next);
  }

  return (
    <AppearanceContext.Provider value={{ preferences, updatePreference, resetAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error("useAppearance must be used within AppearanceProvider");
  return context;
}
