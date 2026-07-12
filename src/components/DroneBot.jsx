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
const CURSOR_OFFSET = { x: 66, y: -100 }; // drone hovers up-right of the cursor
const DRONE_SIZE = 136;

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
    <svg width={size} height={size} viewBox="0 0 220 170" fill="none" aria-hidden="true">
      <style>{`
        @keyframes fan-spin { to { transform: rotate(360deg); } }
        .drone-fan { animation: fan-spin 0.34s linear infinite; transform-box: fill-box; transform-origin: center; }
        .drone-fan-delay { animation-duration: 0.38s; }
        @keyframes eye-blink { 0%, 90%, 100% { transform: scaleY(1); } 94% { transform: scaleY(0.12); } }
        .drone-eye { animation: eye-blink 4.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes antenna-bop { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(8deg); } }
        .drone-antenna { animation: antenna-bop 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }
      `}</style>
      <defs>
        <linearGradient id="byte-orange" x1="64" y1="45" x2="153" y2="132" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffbd3d" />
          <stop offset="0.45" stopColor={colors.body} />
          <stop offset="1" stopColor="#c94a05" />
        </linearGradient>
        <linearGradient id="byte-orange-deep" x1="70" y1="54" x2="150" y2="132" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9c1f" />
          <stop offset="1" stopColor="#a73504" />
        </linearGradient>
        <linearGradient id="byte-duct" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffb13a" />
          <stop offset="0.52" stopColor="#f97316" />
          <stop offset="1" stopColor="#b93a04" />
        </linearGradient>
        <linearGradient id="byte-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset="0.34" stopColor="#b8c0ca" />
          <stop offset="0.72" stopColor="#29313c" />
          <stop offset="1" stopColor="#f3f4f6" />
        </linearGradient>
        <radialGradient id="byte-eye-blue" cx="35%" cy="32%" r="72%">
          <stop stopColor="#9bf7ff" />
          <stop offset="0.45" stopColor="#3287c9" />
          <stop offset="0.62" stopColor="#101725" />
          <stop offset="1" stopColor="#03050a" />
        </radialGradient>
        <filter id="byte-shadow" x="5" y="8" width="210" height="152" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#1e2554" floodOpacity="0.24" />
        </filter>
      </defs>

      <ellipse cx="112" cy="148" rx="55" ry="8" fill="#1e2554" opacity="0.13" />

      <g filter="url(#byte-shadow)">
        {/* Rear top duct */}
        <g transform="translate(0 1)">
          <ellipse cx="111" cy="35" rx="45" ry="18" fill="url(#byte-duct)" />
          <ellipse cx="111" cy="35" rx="34" ry="12" fill="#202331" />
          <g className="drone-fan drone-fan-delay">
            <path d="M111 23c4 6 4 18 0 24-4-6-4-18 0-24Z" fill="#111827" opacity="0.82" />
            <path d="M93 35c9-4 27-4 36 0-9 4-27 4-36 0Z" fill="#111827" opacity="0.82" />
          </g>
          <circle cx="111" cy="35" r="7" fill="url(#byte-metal)" />
          <path d="M79 27c12-8 39-10 60-2" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.42" />
        </g>

        {/* Side ducts and arms */}
        <path d="M73 80H48" stroke="#2a2d36" strokeWidth="12" strokeLinecap="round" />
        <path d="M147 80h25" stroke="#2a2d36" strokeWidth="12" strokeLinecap="round" />
        <g>
          <ellipse cx="42" cy="80" rx="42" ry="22" fill="url(#byte-duct)" />
          <ellipse cx="42" cy="80" rx="31" ry="14" fill="#202331" />
          <g className="drone-fan">
            <path d="M42 67c4 7 4 19 0 26-4-7-4-19 0-26Z" fill="#111827" opacity="0.86" />
            <path d="M22 80c10-4 30-4 40 0-10 4-30 4-40 0Z" fill="#111827" opacity="0.86" />
          </g>
          <circle cx="42" cy="80" r="6.5" fill="url(#byte-metal)" />
          <rect x="27" y="89" width="29" height="10" rx="3" fill="#313743" opacity="0.86" />
          <text x="41.5" y="97" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="800" fill="#ffffff">
            BYTE
          </text>
          <path d="M12 71c13-9 39-12 62-4" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.36" />
        </g>
        <g>
          <ellipse cx="178" cy="80" rx="42" ry="22" fill="url(#byte-duct)" />
          <ellipse cx="178" cy="80" rx="31" ry="14" fill="#202331" />
          <g className="drone-fan drone-fan-delay">
            <path d="M178 67c4 7 4 19 0 26-4-7-4-19 0-26Z" fill="#111827" opacity="0.86" />
            <path d="M158 80c10-4 30-4 40 0-10 4-30 4-40 0Z" fill="#111827" opacity="0.86" />
          </g>
          <circle cx="178" cy="80" r="6.5" fill="url(#byte-metal)" />
          <rect x="163" y="89" width="29" height="10" rx="3" fill="#313743" opacity="0.86" />
          <text x="177.5" y="97" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="800" fill="#ffffff">
            BYTE
          </text>
          <path d="M148 71c13-9 39-12 62-4" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.36" />
        </g>

        {/* Main shell and comic face */}
        <path d="M73 57c8-13 23-20 42-20h11c17 0 31 11 35 28l4 22c4 24-12 46-36 50H93c-24-2-40-20-38-44l2-17c1-9 7-16 16-19Z" fill="url(#byte-orange)" />
        <path d="M133 43c16 4 27 15 31 32l3 14c4 22-10 42-30 47h-15c15-10 22-25 20-44l-4-31c-1-7-3-13-5-18Z" fill="url(#byte-orange-deep)" opacity="0.66" />
        <path d="M71 58c12-11 31-16 57-14-29 7-46 22-51 45-4 20 1 35 15 47-22-5-36-21-36-43V76c0-7 6-13 15-18Z" fill="#ffc247" opacity="0.28" />
        <path d="M83 52h56l5 11H78l5-11Z" fill="#ff9f22" stroke="#cf5208" strokeWidth="2" />
        <text x="111" y="62" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1" fill="#2a2d36">
          BYTE
        </text>

        <path d="M78 80c5-12 19-16 31-9" stroke="#a93b05" strokeWidth="7" strokeLinecap="round" />
        <path d="M111 71c11-8 27-5 33 8" stroke="#a93b05" strokeWidth="7" strokeLinecap="round" />
        <g className="drone-eye">
          <circle cx="92" cy="90" r="18" fill="url(#byte-metal)" />
          <circle cx="92" cy="90" r="14" fill="#fff8ed" />
          <circle cx="94" cy="91" r="8.2" fill="url(#byte-eye-blue)" />
          <circle cx="98" cy="86" r="3.2" fill="#ffffff" />
        </g>
        <g className="drone-eye" style={{ animationDelay: "0.1s" }}>
          <circle cx="128" cy="90" r="18" fill="url(#byte-metal)" />
          <circle cx="128" cy="90" r="14" fill="#fff8ed" />
          <circle cx="130" cy="91" r="8.2" fill="url(#byte-eye-blue)" />
          <circle cx="134" cy="86" r="3.2" fill="#ffffff" />
        </g>
        <circle cx="72" cy="109" r="4.5" fill="#c74807" stroke="#612300" strokeWidth="1.8" opacity="0.75" />
        <circle cx="148" cy="109" r="4.5" fill="#c74807" stroke="#612300" strokeWidth="1.8" opacity="0.75" />
        <path d="M96 116c8 9 24 8 31-1" fill="#17110e" />
        <path d="M96 116c8 9 24 8 31-1" stroke="#17110e" strokeWidth="8" strokeLinecap="round" />
        <path d="M103 116h17" stroke="#fff7ed" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M113 122c6 0 9 4 8 9-6 1-12-2-14-6 1-2 3-3 6-3Z" fill="#ff725f" />
        <path d="M88 138l-8 13M133 138l8 13" stroke="#2a2d36" strokeWidth="6" strokeLinecap="round" />
        <circle cx="110" cy="140" r="7" fill="#252734" />
      </g>
    </svg>
  );
}
