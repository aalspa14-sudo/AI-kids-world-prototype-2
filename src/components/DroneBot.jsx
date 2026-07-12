import { useEffect, useRef, useState } from "react";
import { USER_DATA } from "../data/userData";

/**
 * Byte — the companion drone.
 *
 * - Spring physics: a rAF loop integrates position toward the cursor
 *   (mutating a transform directly, so following never re-renders React).
 * - The outer tracking container is pointer-events: none so it can never
 *   block clicks; only the small drone hitbox re-enables pointer events.
 * - Visuals are isolated in <DroneSvg /> and colored entirely from
 *   USER_DATA.drone.colors, so the character can be re-skinned in config.
 */

const SPRING = { stiffness: 0.045, damping: 0.82 };
const CURSOR_OFFSET = { x: 56, y: -72 }; // drone hovers up-right of the cursor
const DRONE_SIZE = 92;

export default function DroneBot() {
  const { drone } = USER_DATA;
  const containerRef = useRef(null);
  const physics = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, facing: 1 });

  const [bubble, setBubble] = useState(drone.greeting);
  const [dialogueIndex, setDialogueIndex] = useState(-1); // -1 = greeting not yet consumed

  // Cursor tracking + spring integration loop
  useEffect(() => {
    const p = physics.current;
    // Start parked at the bottom-right of the viewport.
    p.x = p.tx = window.innerWidth - 140;
    p.y = p.ty = window.innerHeight - 180;

    const onMove = (e) => {
      p.tx = e.clientX + CURSOR_OFFSET.x;
      p.ty = e.clientY + CURSOR_OFFSET.y;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      // Clamp target so the drone stays fully on screen.
      const maxX = window.innerWidth - DRONE_SIZE - 12;
      const maxY = window.innerHeight - DRONE_SIZE - 12;
      const tx = Math.min(Math.max(p.tx, 12), maxX);
      const ty = Math.min(Math.max(p.ty, 96), maxY);

      p.vx = (p.vx + (tx - p.x) * SPRING.stiffness) * SPRING.damping;
      p.vy = (p.vy + (ty - p.y) * SPRING.stiffness) * SPRING.damping;
      p.x += p.vx;
      p.y += p.vy;

      // Face the direction of travel; tilt with horizontal velocity.
      if (Math.abs(p.vx) > 0.4) p.facing = p.vx > 0 ? 1 : -1;
      const tilt = Math.max(-14, Math.min(14, p.vx * 1.2));

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        const body = containerRef.current.querySelector("[data-drone-body]");
        if (body) body.style.transform = `rotate(${tilt}deg) scaleX(${p.facing})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Auto-dismiss the greeting after a few seconds.
  useEffect(() => {
    if (dialogueIndex === -1 && bubble) {
      const t = setTimeout(() => setBubble(null), 6000);
      return () => clearTimeout(t);
    }
  }, [dialogueIndex, bubble]);

  const handleDroneClick = () => {
    const next = (dialogueIndex + 1) % drone.dialogue.length;
    setDialogueIndex(next);
    setBubble(drone.dialogue[next]);
  };

  return (
    /* Tracking container: MUST stay pointer-events-none so the drone
       never blocks links, buttons or inputs underneath it. */
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{ width: DRONE_SIZE, willChange: "transform" }}
    >
      {/* Chat bubble */}
      {bubble && (
        <div
          className="anim-pop absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-2xl rounded-bl-md px-4 py-3 text-[13px] font-semibold leading-snug text-[var(--text-primary)]"
          style={{
            background: "rgba(26,13,71,0.95)",
            border: "1px solid rgba(34,227,255,0.45)",
            boxShadow: "0 0 24px rgba(34,227,255,0.25)",
            backdropFilter: "blur(6px)",
          }}
          role="status"
        >
          <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--cyan)] mb-1">
            {drone.name} says
          </span>
          {bubble}
        </div>
      )}

      {/* Idle bob wrapper + clickable hitbox (pointer events re-enabled here only) */}
      <div className="anim-bob" style={{ animationDuration: "2.8s" }}>
        <button
          onClick={handleDroneClick}
          aria-label={`Talk to ${drone.name} the drone`}
          className="pointer-events-auto cursor-pointer bg-transparent border-none p-0 block transition-transform hover:scale-110"
          title={`Click to chat with ${drone.name}!`}
        >
          <div data-drone-body style={{ transition: "transform 0.15s ease-out" }}>
            <DroneSvg colors={drone.colors} size={DRONE_SIZE} />
          </div>
        </button>
      </div>
    </div>
  );
}

/**
 * The drone artwork. Pure SVG — tweak paths here, colors in USER_DATA.
 */
function DroneSvg({ colors, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <style>{`
        @keyframes blade-whirl { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.15); } }
        .blade { animation: blade-whirl 0.22s linear infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes eye-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
        .drone-eye { animation: eye-blink 4.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      `}</style>

      {/* Rotor arms */}
      <rect x="8" y="34" width="30" height="5" rx="2.5" fill={colors.bodyDark} />
      <rect x="82" y="34" width="30" height="5" rx="2.5" fill={colors.bodyDark} />

      {/* Propellers */}
      <g className="blade">
        <ellipse cx="16" cy="32" rx="14" ry="3.5" fill={colors.propeller} opacity="0.85" />
      </g>
      <g className="blade" style={{ animationDelay: "0.08s" }}>
        <ellipse cx="104" cy="32" rx="14" ry="3.5" fill={colors.propeller} opacity="0.85" />
      </g>
      <circle cx="16" cy="32" r="3" fill={colors.accent} />
      <circle cx="104" cy="32" r="3" fill={colors.accent} />

      {/* Body */}
      <rect x="28" y="38" width="64" height="48" rx="22" fill={colors.body} />
      <rect x="28" y="62" width="64" height="24" rx="12" fill={colors.bodyDark} />

      {/* Face plate */}
      <rect x="38" y="46" width="44" height="26" rx="13" fill="#1a0d47" />
      {/* Eye */}
      <g className="drone-eye">
        <circle cx="60" cy="59" r="8" fill={colors.eye} />
        <circle cx="63" cy="56" r="2.6" fill="#ffffff" opacity="0.9" />
      </g>

      {/* Cheek lights */}
      <circle cx="44" cy="60" r="2.5" fill={colors.accent} opacity="0.9" />
      <circle cx="76" cy="60" r="2.5" fill={colors.accent} opacity="0.9" />

      {/* Belly stripe + landing feet */}
      <rect x="46" y="74" width="28" height="5" rx="2.5" fill={colors.accent} />
      <rect x="38" y="86" width="10" height="9" rx="4" fill={colors.bodyDark} />
      <rect x="72" y="86" width="10" height="9" rx="4" fill={colors.bodyDark} />

      {/* Antenna */}
      <rect x="58" y="26" width="4" height="14" rx="2" fill={colors.bodyDark} />
      <circle cx="60" cy="24" r="5" fill={colors.eye}>
        <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Thruster glow */}
      <ellipse cx="60" cy="100" rx="16" ry="5" fill={colors.eye} opacity="0.25">
        <animate attributeName="ry" values="5;7;5" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}
