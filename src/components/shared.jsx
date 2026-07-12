/**
 * Shared UI primitives — Prototype 2 (light EdTech skin).
 * Same exports/API as prototype 1; only the styling values changed.
 */

// Colorful pastel icon chips (reference-image style)
export const CHIP_STYLES = {
  chipA: {
    color: "#7c3aed",
    background: "rgba(124,58,237,0.1)",
    border: "1px solid rgba(124,58,237,0.18)",
    boxShadow: "0 8px 20px rgba(124,58,237,0.15)",
  },
  chipB: {
    color: "#16a34a",
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.22)",
    boxShadow: "0 8px 20px rgba(34,197,94,0.15)",
  },
  chipC: {
    color: "#ec4899",
    background: "rgba(236,72,153,0.1)",
    border: "1px solid rgba(236,72,153,0.2)",
    boxShadow: "0 8px 20px rgba(236,72,153,0.15)",
  },
};

// Named accent colors used across data-driven sections (stats, tiles, trust row)
export const ACCENTS = {
  purple: { color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  blue: { color: "#2f6bff", bg: "rgba(47,107,255,0.1)" },
  green: { color: "#16a34a", bg: "rgba(34,197,94,0.12)" },
  gold: { color: "#f59e0b", bg: "rgba(245,158,11,0.13)" },
  pink: { color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
  cyan: { color: "#0aa8d6", bg: "rgba(10,168,214,0.11)" },
};

// Letter-by-letter rainbow wordmark (like the reference "AI Kids")
const RAINBOW = ["#2f6bff", "#8b3dff", "#ff9d2e", "#22c55e", "#0aa8d6", "#ec4899"];

export function RainbowText({ text }) {
  let colorIndex = 0;
  return (
    <span>
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i}> </span>;
        const color = RAINBOW[colorIndex++ % RAINBOW.length];
        return (
          <span key={i} style={{ color }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

export function IconChip({ chip = "chipA", children }) {
  return (
    <div className="chip" style={CHIP_STYLES[chip]}>
      {children}
    </div>
  );
}

export function Badge({ emoji, text }) {
  return (
    <span className="badge">
      <span aria-hidden="true">{emoji}</span>
      {text}
    </span>
  );
}

export function SectionHeader({ badge, heading, subcopy, center = true }) {
  return (
    <div className={`max-w-[640px] ${center ? "mx-auto text-center" : ""} mb-12`}>
      {badge && <Badge emoji={badge.emoji} text={badge.text} />}
      <h2 className="h2-section mt-4">{heading}</h2>
      {subcopy && <p className="mt-3 text-[var(--text-muted)]">{subcopy}</p>}
    </div>
  );
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
