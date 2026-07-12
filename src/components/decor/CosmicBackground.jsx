import { useMemo } from "react";
import {
  Bot,
  BookOpenCheck,
  BrainCircuit,
  Braces,
  Cpu,
  MessageCircle,
  Network,
  ShieldCheck,
} from "lucide-react";

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

const AI_FLOATIES = [
  { Icon: Bot, top: "15%", left: "4%", size: 54, delay: "0s", colors: ["#f7f3ff", "#8b5cf6"], rotate: "-8deg" },
  { Icon: BrainCircuit, top: "24%", left: "88%", size: 62, delay: "1.2s", colors: ["#eef7ff", "#2f6bff"], rotate: "7deg" },
  { Icon: Network, top: "47%", left: "93%", size: 48, delay: "2s", colors: ["#ecfeff", "#20c7e8"], rotate: "-5deg" },
  { Icon: Braces, top: "68%", left: "5%", size: 46, delay: "1.6s", colors: ["#fff7ed", "#ff9d2e"], rotate: "8deg" },
  { Icon: Cpu, top: "78%", left: "86%", size: 54, delay: "2.8s", colors: ["#f0fdf4", "#22c55e"], rotate: "-6deg" },
  { Icon: BookOpenCheck, top: "36%", left: "10%", size: 50, delay: "3.4s", colors: ["#fff1f8", "#ec4899"], rotate: "5deg" },
  { Icon: ShieldCheck, top: "58%", left: "82%", size: 44, delay: "0.8s", colors: ["#eef2ff", "#5b7cff"], rotate: "4deg" },
  { Icon: MessageCircle, top: "86%", left: "13%", size: 42, delay: "2.4s", colors: ["#f5f3ff", "#a855f7"], rotate: "-7deg" },
];

export default function CosmicBackground() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const seed = (i * 2654435761) % 1000;
        return {
          left: `${(seed * 7) % 100}%`,
          top: `${(seed * 13) % 100}%`,
          size: 2 + ((seed * 3) % 16) / 8,
          delay: `${(seed % 50) / 10}s`,
          color: ["#8b3dff", "#2f6bff", "#ff9d2e", "#0aa8d6", "#ec4899", "#22c55e"][i % 6],
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
            opacity: 0.22,
            animation: `twinkle 5s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {AI_FLOATIES.map(({ Icon, colors, size, rotate, ...f }, i) => (
        <span
          key={i}
          className="ai-floatie absolute grid select-none place-items-center"
          style={{
            top: f.top,
            left: f.left,
            width: size,
            height: size,
            color: colors[1],
            background: `linear-gradient(145deg, ${colors[0]} 0%, rgba(255,255,255,0.7) 42%, ${colors[1]}33 100%)`,
            "--float-rotate": rotate,
            animation: `drift 8s ease-in-out ${f.delay} infinite`,
          }}
        >
          <Icon size={Math.round(size * 0.48)} strokeWidth={2.5} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}
