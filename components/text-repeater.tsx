"use client";

import { useMemo, useState } from "react";
import { fontStyles } from "@/lib/fonts";

type SeparatorMode = "space" | "newline" | "comma" | "none" | "custom";

const MAX_REPEAT_COUNT = 100;
const MAX_INPUT_LENGTH = 500;

export function TextRepeater() {
  const [text, setText] = useState("Hello World");
  const [repeatCount, setRepeatCount] = useState(5);
  const [styleId, setStyleId] = useState("original");
  const [separatorMode, setSeparatorMode] =
    useState<SeparatorMode>("space");
  const [customSeparator, setCustomSeparator] = useState(" • ");
  const [copyMessage, setCopyMessage] = useState("");

  const selectedStyle = fontStyles.find(
    (style) => style.id === styleId
  );

  const styledText = useMemo(() => {
    return selectedStyle ? selectedStyle.transform(text) : text;
  }, [selectedStyle, text]);

  const separator = useMemo(() => {
    switch (separatorMode) {
      case "newline":
        return "\n";
      case "comma":
        return ", ";
      case "none":
        return "";
      case "custom":
        return customSeparator;
      default:
        return " ";
    }
  }, [separatorMode, customSeparator]);

  const result = useMemo(() => {
    if (!text) return "";

    return Array.from(
      { length: repeatCount },
      () => styledText
    ).join(separator);
  }, [text, repeatCount, styledText, separator]);

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopyMessage("Copied successfully!");
    } catch {
      setCopyMessage(
        "Copy unavailable. Select the result and copy it manually."
      );
    }
  }

  return (
    <section className="text-repeater-tool">
      <div className="text-repeater-card glass-panel">
        <div className="text-repeater-heading">
          <span className="eyebrow">Repeat and restyle</span>
          <h2>Text Repeater</h2>
          <p>
            Repeat any word or sentence, choose a Unicode text style,
            and copy the result
          </p>
        </div>

        <div className="text-repeater-field">
          <div className="text-repeater-label-row">
            <label htmlFor="repeater-input">Text to repeat</label>
            <span>
              {text.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>

          <textarea
            id="repeater-input"
            className="text-input"
            value={text}
            maxLength={MAX_INPUT_LENGTH}
            rows={3}
            placeholder="Enter a word or sentence..."
            onChange={(event) => {
              setText(event.target.value);
              setCopyMessage("");
            }}
          />
        </div>

        <div className="text-repeater-controls">
          <div className="text-repeater-field">
            <label htmlFor="repeater-count">Repeat count</label>
            <input
              id="repeater-count"
              type="number"
              min={1}
              max={MAX_REPEAT_COUNT}
              value={repeatCount}
              onChange={(event) => {
                const value = Number(event.target.value);

                if (!Number.isFinite(value)) return;

                setRepeatCount(
                  Math.min(
                    MAX_REPEAT_COUNT,
                    Math.max(1, Math.trunc(value))
                  )
                );
                setCopyMessage("");
              }}
            />
            <div className="text-repeater-presets">
              {[2, 5, 10, 25, 50, 100].map((count) => (
                <button
                  className="secondary-button"
                  key={count}
                  type="button"
                  aria-pressed={repeatCount === count}
                  onClick={() => {
                    setRepeatCount(count);
                    setCopyMessage("");
                  }}
                >
                  {count}×
                </button>
              ))}
            </div>
          </div>

          <div className="text-repeater-field">
            <label htmlFor="repeater-style">Text style</label>
            <select
              id="repeater-style"
              value={styleId}
              onChange={(event) => {
                setStyleId(event.target.value);
                setCopyMessage("");
              }}
            >
              <option value="original">Original text</option>

              {fontStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name} — {style.category}
                </option>
              ))}
            </select>
          </div>

          <div className="text-repeater-field">
            <label htmlFor="repeater-separator">Separator</label>
            <select
              id="repeater-separator"
              value={separatorMode}
              onChange={(event) => {
                setSeparatorMode(
                  event.target.value as SeparatorMode
                );
                setCopyMessage("");
              }}
            >
              <option value="space">Space</option>
              <option value="newline">New line</option>
              <option value="comma">Comma</option>
              <option value="none">No separator</option>
              <option value="custom">Custom separator</option>
            </select>
          </div>

          {separatorMode === "custom" && (
            <div className="text-repeater-field">
              <label htmlFor="repeater-custom-separator">
                Custom separator
              </label>
              <input
                id="repeater-custom-separator"
                type="text"
                maxLength={20}
                value={customSeparator}
                placeholder="Enter a separator..."
                onChange={(event) => {
                  setCustomSeparator(event.target.value);
                  setCopyMessage("");
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-repeater-card glass-panel">
        <div className="text-repeater-label-row">
          <label htmlFor="repeater-result">Repeated result</label>
          <span>{result.length.toLocaleString()} characters</span>
        </div>

        <textarea
          id="repeater-result"
          className="text-input text-repeater-result"
          value={result}
          readOnly
          rows={6}
          placeholder="Your repeated text will appear here..."
        />

        <div className="text-repeater-actions">
          <button
            className="primary-button"
            type="button"
            onClick={copyResult}
            disabled={!result}
          >
            Copy result
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              setText("");
              setCopyMessage("");
            }}
          >
            Clear text
          </button>

          <span className="text-repeater-feedback" aria-live="polite">
            {copyMessage}
          </span>
        </div>
      </div>
    </section>
  );
}