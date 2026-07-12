import { useMemo } from "react";
import { USER_DATA } from "../../data/userData";

/**
 * Light decorative layer (Prototype 2): soft pastel gradient blobs,
 * faint sparkle dots and gently drifting space emoji.
 * Purely visual — pointer-events: none.
 */

const BLOBS = [
  { color: "#c9b8ff", size: 460, top: "-8%", left: "-10%" },
  { color: "#b7d4ff", size: 420, top: "18%", left: "80%" },
  { color: "#ffd9b0", size: 300, top: "58%", left: "-8%" },
  { color: "#c3f2d9", size: 340, top: "84%", left: "76%" },
];

export default function CosmicBackground() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const seed = (i * 2654435761) % 1000;
        return {
          left: `${(seed * 7) % 100}%`,
          top: `${(seed * 13) % 100}%`,
          size: 2 + ((seed * 3) % 16) / 8,
          delay: `${(seed % 50) / 10}s`,
          color: ["#8b3dff", "#2f6bff", "#ff9d2e", "#0aa8d6"][i % 4],
        };
      }),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
            opacity: 0.4,
            filter: "blur(100px)",
          }}
        />
      ))}

      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            opacity: 0.35,
            animation: `twinkle 5s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {USER_DATA.floaties.map((f, i) => (
        <span
          key={i}
          className="absolute text-3xl md:text-4xl opacity-40 select-none"
          style={{
            top: f.top,
            left: f.left,
            animation: `drift 7s ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}
