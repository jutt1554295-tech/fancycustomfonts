"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { accentPresets, type ThemeMode } from "@/lib/appearance";
import { useAppearance } from "@/components/appearance-provider";

type RangeControlProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
};

function RangeControl({ id, label, value, min, max, unit, onChange }: RangeControlProps) {
  return (
    <div className="appearance-range">
      <div className="appearance-range-heading">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{value}{unit}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

const modes: { label: string; value: ThemeMode; icon: string }[] = [
  { label: "Dark", value: "dark", icon: "◐" },
  { label: "Light", value: "light", icon: "☼" },
  { label: "System", value: "system", icon: "⌘" },
];

export function AppearanceControl() {
  const { preferences, updatePreference, resetAppearance } = useAppearance();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const swatchStyle = (color: string): CSSProperties => ({ "--swatch-color": color } as CSSProperties);

  return (
    <div className="appearance-control" ref={rootRef}>
      <button
        className="appearance-trigger"
        type="button"
        aria-label="Customize appearance"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="appearance-panel"
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
      >
        <span className="appearance-trigger-icon" aria-hidden="true">◐</span>
        <span className="appearance-trigger-label">Theme</span>
      </button>

      {open && (
        <section className="appearance-panel glass-panel" id="appearance-panel" role="dialog" aria-labelledby="appearance-title">
          <div className="appearance-panel-heading">
            <div>
              <span className="eyebrow">Your workspace</span>
              <h2 id="appearance-title">Customize appearance</h2>
            </div>
            <button className="appearance-close" type="button" aria-label="Close appearance settings" onClick={() => setOpen(false)}>×</button>
          </div>

          <fieldset className="appearance-group">
            <legend>Theme mode</legend>
            <div className="appearance-modes" role="group" aria-label="Theme mode">
              {modes.map((mode) => (
                <button
                  className={`appearance-mode ${preferences.mode === mode.value ? "is-selected" : ""}`}
                  key={mode.value}
                  type="button"
                  aria-pressed={preferences.mode === mode.value}
                  onClick={() => updatePreference("mode", mode.value)}
                >
                  <span aria-hidden="true">{mode.icon}</span>{mode.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="appearance-group">
            <legend>Accent color</legend>
            <div className="accent-swatches">
              {accentPresets.map((preset) => (
                <button
                  className={`accent-swatch ${preferences.accent === preset.color ? "is-selected" : ""}`}
                  key={preset.name}
                  type="button"
                  title={preset.name}
                  aria-label={`${preset.name} accent`}
                  aria-pressed={preferences.accent === preset.color}
                  style={swatchStyle(preset.color)}
                  onClick={() => updatePreference("accent", preset.color)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
              <label className={`accent-swatch accent-custom ${accentPresets.some((preset) => preset.color === preferences.accent) ? "" : "is-selected"}`} style={swatchStyle(preferences.accent)}>
                <span aria-hidden="true">＋</span>
                <span className="sr-only">Custom accent color</span>
                <input
                  type="color"
                  value={preferences.accent}
                  aria-label="Choose custom accent color"
                  onChange={(event) => updatePreference("accent", event.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="appearance-group appearance-adjustments">
            <legend>Surface & atmosphere</legend>
            <RangeControl id="appearance-brightness" label="Background brightness" min={0} max={100} value={preferences.brightness} unit="%" onChange={(value) => updatePreference("brightness", value)} />
            <RangeControl id="appearance-transparency" label="Glass transparency" min={20} max={85} value={preferences.transparency} unit="%" onChange={(value) => updatePreference("transparency", value)} />
            <RangeControl id="appearance-blur" label="Glass blur" min={0} max={28} value={preferences.blur} unit="px" onChange={(value) => updatePreference("blur", value)} />
            <RangeControl id="appearance-glow" label="Glow intensity" min={0} max={100} value={preferences.glow} unit="%" onChange={(value) => updatePreference("glow", value)} />
          </fieldset>

          <div className="appearance-panel-footer">
            <span>Saved on this device</span>
            <button className="appearance-reset" type="button" onClick={resetAppearance}>Reset to default</button>
          </div>
        </section>
      )}
    </div>
  );
}