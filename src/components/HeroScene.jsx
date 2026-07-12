/**
 * HeroScene — hand-built vector version of the reference artwork:
 * two tweens at a laptop with a friendly white robot, on a glowing
 * platform, surrounded by floating glass UI cards.
 *
 * Automatically replaced by public/hero-art.png when that file exists
 * (see <HeroArt /> in Hero.jsx).
 */
import { Bot, Code2, Trophy, Play, Wand2 } from "lucide-react";

export default function HeroScene() {
  return (
    <div className="relative mx-auto max-w-[560px]">
      {/* Soft halo behind the whole scene */}
      <div
        className="absolute inset-6 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(139,61,255,0.16), rgba(47,107,255,0.08), transparent)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      <SceneSvg />

      {/* ---- Floating glass UI cards ---- */}
      <div className="glass anim-float absolute top-[2%] left-[6%] px-4 py-3 flex items-center gap-3 w-[210px]" style={{ animationDuration: "6s" }}>
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: "var(--grad-primary-btn)" }}>
          <Bot size={18} />
        </span>
        <div className="flex-1">
          <p className="font-display font-bold text-[13px] leading-tight">AI Explorer</p>
          <p className="text-[11px] font-semibold text-[var(--text-muted)]">Learning Path</p>
          <div className="mt-1.5 h-1.5 rounded-full bg-[rgba(93,105,190,0.15)] overflow-hidden">
            <div className="h-full w-[78%] rounded-full" style={{ background: "var(--grad-primary-btn)" }} />
          </div>
        </div>
        <span className="text-[11px] font-extrabold text-[var(--purple)]">78%</span>
      </div>

      <div className="glass anim-float absolute top-[38%] -left-2 md:-left-6 px-4 py-3 w-[150px]" style={{ animationDuration: "7.2s", animationDelay: "0.8s" }}>
        <p className="font-display font-bold text-[12px] flex items-center gap-1.5 mb-2">
          <Code2 size={13} className="text-[var(--blue)]" /> Code with AI
        </p>
        <div className="space-y-1.5">
          <div className="h-1.5 w-[85%] rounded-full bg-[#8b3dff88]" />
          <div className="h-1.5 w-[65%] rounded-full bg-[#2f6bff88]" />
          <div className="h-1.5 w-[75%] rounded-full bg-[#ec489988]" />
          <div className="h-1.5 w-[50%] rounded-full bg-[#16a34a88]" />
        </div>
      </div>

      <div className="glass anim-float absolute top-[10%] right-0 md:-right-4 px-4 py-3 w-[170px]" style={{ animationDuration: "6.6s", animationDelay: "1.4s" }}>
        <p className="font-display font-bold text-[12px] flex items-center gap-1.5 mb-2">
          <Wand2 size={13} className="text-[var(--purple)]" /> Create with AI
        </p>
        <div className="flex gap-2 items-center">
          <div className="h-11 flex-1 rounded-lg" style={{ background: "linear-gradient(135deg,#7cc4ff,#b7f0d8)" }} />
          <div className="h-11 flex-1 rounded-lg relative" style={{ background: "linear-gradient(135deg,#c9b8ff,#ffb8e2)" }}>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                <Play size={10} className="text-[var(--purple)] ml-0.5" fill="currentColor" />
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="glass anim-float absolute bottom-[16%] right-0 md:-right-2 px-4 py-3 flex items-center gap-3" style={{ animationDuration: "5.8s", animationDelay: "0.4s" }}>
        <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.15)", color: "var(--gold)" }}>
          <Trophy size={18} />
        </span>
        <div>
          <p className="font-display font-bold text-[13px] leading-tight">AI Challenge</p>
          <p className="text-[11px] font-bold text-[var(--purple)]">Level 5 ⭐</p>
        </div>
      </div>
    </div>
  );
}

/* ================= vector illustration ================= */

function SceneSvg() {
  return (
    <svg viewBox="0 0 560 460" className="relative w-full h-auto" role="img" aria-label="Two kids learning AI on a laptop with a friendly robot">
      <defs>
        <linearGradient id="hsPlatform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9edfc" />
          <stop offset="100%" stopColor="#d3dcf8" />
        </linearGradient>
        <linearGradient id="hsRobot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dfe6f5" />
        </linearGradient>
        <linearGradient id="hsPlanet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7cc4ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="hsHoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d7bff" />
          <stop offset="100%" stopColor="#2559d8" />
        </linearGradient>
        <linearGradient id="hsSweater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a6cf8" />
          <stop offset="100%" stopColor="#7b47e0" />
        </linearGradient>
      </defs>

      {/* Planet with ring */}
      <g transform="translate(498 62)">
        <circle r="24" fill="url(#hsPlanet)" />
        <ellipse rx="38" ry="10" fill="none" stroke="#8b5cf6" strokeWidth="4" opacity="0.55" transform="rotate(-18)" />
      </g>
      <circle cx="60" cy="80" r="6" fill="#ffd54a" opacity="0.8" />
      <circle cx="530" cy="180" r="5" fill="#ec4899" opacity="0.6" />

      {/* Platform */}
      <ellipse cx="290" cy="408" rx="240" ry="36" fill="url(#hsPlatform)" />
      <ellipse cx="290" cy="404" rx="200" ry="26" fill="#eef2ff" />
      <ellipse cx="290" cy="418" rx="240" ry="30" fill="#8b5cf6" opacity="0.12" />

      {/* ---------------- Robot ---------------- */}
      <g>
        <ellipse cx="128" cy="400" rx="62" ry="12" fill="#1e2554" opacity="0.08" />
        {/* legs */}
        <rect x="106" y="360" width="16" height="30" rx="8" fill="#c7d2ea" />
        <rect x="134" y="360" width="16" height="30" rx="8" fill="#c7d2ea" />
        <ellipse cx="114" cy="392" rx="14" ry="8" fill="#dfe6f5" />
        <ellipse cx="142" cy="392" rx="14" ry="8" fill="#dfe6f5" />
        {/* waving arm (behind body) */}
        <g>
          <rect x="160" y="252" width="18" height="58" rx="9" fill="url(#hsRobot)" transform="rotate(-38 169 281)" />
          <circle cx="196" cy="238" r="13" fill="#ffffff" stroke="#dfe6f5" strokeWidth="3" />
        </g>
        {/* left arm */}
        <rect x="76" y="288" width="18" height="52" rx="9" fill="url(#hsRobot)" transform="rotate(16 85 314)" />
        {/* body */}
        <rect x="88" y="278" width="80" height="92" rx="36" fill="url(#hsRobot)" />
        {/* chest badge */}
        <rect x="110" y="308" width="36" height="26" rx="10" fill="#2f6bff" />
        <text x="128" y="326" textAnchor="middle" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fontSize="15" fill="#ffffff">AI</text>
        {/* antenna */}
        <rect x="124" y="176" width="6" height="16" rx="3" fill="#2f6bff" />
        <circle cx="127" cy="172" r="7" fill="#2f6bff">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* head */}
        <rect x="80" y="190" width="94" height="82" rx="40" fill="url(#hsRobot)" />
        {/* ear pods */}
        <circle cx="80" cy="231" r="10" fill="#c7d2ea" />
        <circle cx="174" cy="231" r="10" fill="#c7d2ea" />
        {/* face screen */}
        <rect x="94" y="204" width="66" height="52" rx="24" fill="#1e2554" />
        {/* winking face */}
        <ellipse cx="114" cy="226" rx="6" ry="8" fill="#22e3ff" />
        <path d="M136 224 q7 -6 14 0" stroke="#22e3ff" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M116 240 q11 9 24 -1" stroke="#22e3ff" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* ---------------- Boy (blue hoodie) ---------------- */}
      <g>
        <ellipse cx="300" cy="402" rx="80" ry="13" fill="#1e2554" opacity="0.08" />
        {/* torso */}
        <path d="M248 402 q0 -74 52 -74 q52 0 52 74 z" fill="url(#hsHoodie)" />
        {/* hood collar */}
        <path d="M272 336 q28 16 56 0 l-6 14 q-22 12 -44 0 z" fill="#1e46b8" />
        {/* neck */}
        <rect x="290" y="316" width="20" height="18" rx="8" fill="#eeb187" />
        {/* head */}
        <circle cx="300" cy="282" r="36" fill="#f2c19a" />
        {/* ears */}
        <circle cx="264" cy="284" r="6" fill="#eeb187" />
        <circle cx="336" cy="284" r="6" fill="#eeb187" />
        {/* spiky dark hair */}
        <path
          d="M262 278
             q-4 -34 22 -44 q-4 -8 2 -8 q4 2 8 6 q2 -10 10 -10 q4 2 6 8 q8 -6 14 -2 q4 4 0 10
             q18 8 14 40 q-8 -18 -20 -22 q-26 -10 -42 2 q-10 6 -14 20 z"
          fill="#23283f"
        />
        {/* brows */}
        <path d="M280 274 q7 -5 14 -1" stroke="#23283f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M306 273 q7 -4 14 1" stroke="#23283f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="288" cy="286" r="4.5" fill="#23283f" />
        <circle cx="314" cy="286" r="4.5" fill="#23283f" />
        <circle cx="289.5" cy="284.5" r="1.4" fill="#ffffff" />
        <circle cx="315.5" cy="284.5" r="1.4" fill="#ffffff" />
        {/* confident smile */}
        <path d="M290 302 q10 8 21 1" stroke="#b06a3f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* arms typing */}
        <path d="M252 372 q6 20 26 22 l4 -12 q-16 -4 -20 -16 z" fill="#eeb187" />
        <path d="M348 372 q-6 20 -26 22 l-4 -12 q16 -4 20 -16 z" fill="#eeb187" />
      </g>

      {/* ---------------- Laptop ---------------- */}
      <g>
        {/* lid */}
        <rect x="242" y="330" width="118" height="74" rx="9" fill="#2b3860" />
        <rect x="248" y="336" width="106" height="62" rx="6" fill="#3d7bff" opacity="0.9" />
        {/* screen glow content */}
        <rect x="258" y="346" width="50" height="5" rx="2.5" fill="#bcd7ff" />
        <rect x="258" y="357" width="70" height="5" rx="2.5" fill="#9ec4ff" opacity="0.8" />
        <rect x="258" y="368" width="40" height="5" rx="2.5" fill="#bcd7ff" opacity="0.7" />
        <circle cx="335" cy="382" r="9" fill="#ffffff" opacity="0.9" />
        {/* base */}
        <path d="M228 404 l16 -6 h114 l16 6 q4 6 -4 8 h-138 q-8 -2 -4 -8 z" fill="#c7d2ea" />
      </g>

      {/* ---------------- Girl (purple sweater) ---------------- */}
      <g>
        <ellipse cx="428" cy="404" rx="72" ry="12" fill="#1e2554" opacity="0.08" />
        {/* back hair */}
        <path d="M392 300 q-8 66 12 92 q24 10 50 0 q20 -26 12 -92 q-16 -26 -74 0 z" fill="#6a4630" />
        {/* torso */}
        <path d="M382 404 q-2 -62 46 -62 q48 0 46 62 z" fill="url(#hsSweater)" />
        {/* neck */}
        <rect x="418" y="330" width="18" height="16" rx="7" fill="#efb98f" />
        {/* head */}
        <circle cx="428" cy="300" r="33" fill="#f7cba6" />
        {/* front hair + headband */}
        <path
          d="M394 300 q-4 -40 34 -42 q38 2 34 42 q-6 -14 -14 -18 q4 10 -2 12 q-8 -14 -22 -14 q-16 0 -24 12 q-4 4 -6 8 z"
          fill="#7a5236"
        />
        <path d="M398 276 q30 -22 60 0" stroke="#a855f7" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* brows */}
        <path d="M410 292 q6 -4 12 -1" stroke="#5d3d28" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M434 291 q6 -3 12 1" stroke="#5d3d28" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="417" cy="302" r="4.2" fill="#3a2a1c" />
        <circle cx="441" cy="302" r="4.2" fill="#3a2a1c" />
        <circle cx="418.4" cy="300.6" r="1.3" fill="#ffffff" />
        <circle cx="442.4" cy="300.6" r="1.3" fill="#ffffff" />
        {/* smile */}
        <path d="M420 316 q9 7 18 0" stroke="#c26a45" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        {/* arm resting, hand on chin */}
        <path d="M398 404 q-2 -34 14 -52 q8 -8 14 -2 l-6 14 q-10 16 -8 40 z" fill="url(#hsSweater)" />
        <circle cx="424" cy="336" r="9" fill="#efb98f" />
      </g>
    </svg>
  );
}
