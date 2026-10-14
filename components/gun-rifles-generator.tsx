"use client";

import { useState } from "react";

const frakturUpper = Array.from(
  "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ"
);

const frakturLower = Array.from(
  "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
);

function toFraktur(text: string) {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return frakturUpper[code - 65] ?? char;
      }

      if (code >= 97 && code <= 122) {
        return frakturLower[code - 97] ?? char;
      }

      return char;
    })
    .join("");
}

const gunDesigns = [
  {
    id: 1,
    title: "Receiver Style",
    description: "Name displayed inside the main body",
    build: (name: string) => `︻╦══〔${name}〕══╤──`,
  },
  {
    id: 2,
    title: "Long Rifle",
    description: "Extended rifle-inspired text design",
    build: (name: string) => `━━╤═『${name}』═╦══`,
  },
  {
    id: 3,
    title: "Scope Style",
    description: "Name enclosed in a scope-like frame",
    build: (name: string) => `╾━╤══【${name}】══╦─`,
  },
  {
    id: 4,
    title: "Magazine Panel",
    description: "Name inside a boxed panel",
    build: (name: string) => `╔══╦═〔${name}〕═╤══╗`,
  },
  {
    id: 5,
    title: "Tactical Frame",
    description: "Name enclosed in a bold frame",
    build: (name: string) => `╞═╦══⟦${name}⟧══╤─`,
  },
  {
    id: 6,
    title: "Classic Rifle",
    description: "A longer decorative gun-style pattern",
    build: (name: string) => `︻╦╦══〈${name}〉═══╤──`,
  },
  {
    id: 7,
    title: "Body Engraving",
    description: "Name framed like an engraved label",
    build: (name: string) => `╾══╣〔${name}〕╠══─`,
  },
  {
    id: 8,
    title: "Compact Frame",
    description: "A compact design for gaming names",
    build: (name: string) => `╔═╤═《${name}》═╦══╝`,
  },
  {
    id: 9,
    title: "Gamer Edition",
    description: "A decorated design with name inside",
    build: (name: string) => `乂︻╦══『${name}』══╤──乂`,
  },
];

export function GunRiflesGenerator() {
  const [name, setName] = useState("Zohaib");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copyError, setCopyError] = useState(false);

  const styledName = toFraktur(name.trim() || "YOUR NAME");
  const designs = gunDesigns.map((design) => ({
    ...design,
    result: design.build(styledName),
  }));

  async function copyDesign(id: number, result: string) {
    try {
      await navigator.clipboard.writeText(result);
      setCopiedId(id);
      setCopyError(false);

      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 1600);
    } catch {
      setCopyError(true);
      setCopiedId(null);
    }
  }

  return (
    <section className="gun-rifles-tool" aria-labelledby="gun-rifles-heading">
      <header className="gun-rifles-heading">
        <p className="gun-rifles-eyebrow">GAMING TEXT CREATOR</p>
        <h1 id="gun-rifles-heading">Gun &amp; Rifles</h1>
        <p>
          Enter your name, explore nine different gun-inspired text designs,
          and copy your favourite for your gaming profile.
        </p>
      </header>

      <div className="gun-rifles-input-panel">
        <label htmlFor="gun-rifles-name">Your name</label>

        <input
          id="gun-rifles-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value.slice(0, 18));
            setCopiedId(null);
            setCopyError(false);
          }}
          placeholder="Text to Transform"
          maxLength={18}
          autoComplete="off"
        />

        <p className="gun-rifles-hint">
          Your name updates automatically in all nine designs.
        </p>
      </div>

      <div className="gun-rifles-results-heading">
        <h2>Gun Designs</h2>
        <span>{designs.length} designs</span>
      </div>

      <div className="gun-rifles-grid">
        {designs.map((design) => (
          <article className="gun-rifles-card" key={design.id}>
            <div className="gun-rifles-card-top">
              <span className="gun-rifles-number">
                {String(design.id).padStart(2, "0")}
              </span>
              <span className="gun-rifles-count">
                {design.id} of {designs.length}
              </span>
            </div>

            <h3>{design.title}</h3>
            <p className="gun-rifles-description">
              {design.description}
            </p>

            <div className="gun-rifles-preview" aria-live="polite">
              <span>{design.result}</span>
            </div>

            <button
              className="gun-rifles-copy"
              type="button"
              onClick={() => copyDesign(design.id, design.result)}
            >
              {copiedId === design.id ? "Copied!" : "Copy Design"}
            </button>
          </article>
        ))}
      </div>

      {copyError && (
        <p className="gun-rifles-error" role="alert">
          Copy was blocked by your browser. Please check clipboard permissions
          and try again.
        </p>
      )}

      <p className="gun-rifles-footer-note">
        These are decorative text designs, not actual gun illustrations.
        Symbols may look different across games and devices.
      </p>
    </section>
  );
}