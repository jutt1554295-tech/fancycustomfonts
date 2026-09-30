"use client";

import { useState } from "react";

const symbolGroups = [
  { title: "Stars & sparkle", symbols: ["✦", "✧", "★", "☆", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "❂", "❈", "⋆", "✵"] },
  { title: "Hearts & cute", symbols: ["♡", "♥", "ღ", "❥", "❣", "۵", "୨୧", "ꨄ", "ෆ", "დ", "ᰔ", "❦", "❧", "☙", "𖹭", "ʚɞ"] },
  { title: "Arrows & pointers", symbols: ["➜", "➤", "➳", "➵", "➸", "➺", "↠", "↣", "⇢", "⇝", "⟶", "➽", "⤷", "↬", "➴", "➛"] },
  { title: "Decorative brackets", symbols: ["「」", "『』", "【】", "〈〉", "《》", "〔〕", "〘〙", "〚〛", "꧁꧂", "༺༻", "⦗⦘", "❮❯", "⟦⟧", "⌜⌟", "〄", "※"] },
  { title: "Gaming & power", symbols: ["♛", "♕", "⚔", "⚡", "☠", "☣", "♜", "♞", "♟", "✠", "⛧", "⟁", "⌖", "⦿", "◈", "⛨"] },
  { title: "Minimal marks", symbols: ["·", "•", "◦", "○", "◌", "◎", "◇", "◆", "△", "▽", "□", "▪", "⁕", "⁜", "⁘", "⁙"] },
];

export function SymbolBrowser() {
  const [copiedSymbol, setCopiedSymbol] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  async function copySymbol(symbol: string) {
    try {
      await navigator.clipboard.writeText(symbol);
      setCopiedSymbol(symbol);
      setCopyMessage(`${symbol} copied to clipboard`);
      window.setTimeout(() => setCopiedSymbol(""), 1300);
    } catch {
      setCopyMessage("Clipboard access is unavailable in this browser");
      setCopiedSymbol("");
    }
  }

  return (
    <div className="symbol-groups">
      {symbolGroups.map((group) => (
        <section className="symbol-group" key={group.title}>
          <h2>{group.title}</h2>
          <div className="symbol-grid">
            {group.symbols.map((symbol, index) => (
              <button
                className={`symbol-button ${copiedSymbol === symbol ? "is-copied" : ""}`}
                type="button"
                key={`${symbol}-${index}`}
                aria-label={`Copy ${symbol}`}
                title={`Copy ${symbol}`}
                onClick={() => copySymbol(symbol)}
              >
                {copiedSymbol === symbol ? "✓" : symbol}
              </button>
            ))}
          </div>
        </section>
      ))}
      <p className="symbol-feedback" aria-live="polite">{copyMessage}</p>
    </div>
  );
}