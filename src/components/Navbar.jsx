import { useState } from "react";
import { Menu, X } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { RainbowText, scrollToId } from "./shared";

export default function Navbar() {
  const { brand, nav } = USER_DATA;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToId(href.replace("#", ""));
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(255,255,255,0.78)] border-b border-[rgba(93,105,190,0.12)]">
      <nav className="wrap flex items-center justify-between py-3.5">
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white"
            style={{ boxShadow: "0 6px 18px rgba(93,105,190,0.25), 0 0 0 3px rgba(139,61,255,0.15)" }}
            aria-hidden="true"
          >
            {brand.logoEmoji}
          </span>
          <span className="font-display font-extrabold text-lg leading-tight">
            <RainbowText text={brand.name} />
            <span className="block text-[11px] font-body font-bold text-[var(--text-muted)] tracking-wide uppercase">
              {brand.tagline}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-bold text-[15px] text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <PlaygroundPill cta={nav.playgroundCta} />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-primary)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden wrap pb-5 flex flex-col gap-4 anim-pop">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-bold text-[var(--text-muted)] hover:text-[var(--purple)]"
            >
              {link.label}
            </a>
          ))}
          <PlaygroundPill cta={nav.playgroundCta} onNavigate={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
}

function PlaygroundPill({ cta, onNavigate }) {
  return (
    <button
      onClick={() => {
        scrollToId(cta.targetId);
        onNavigate?.();
      }}
      className="anim-bob anim-pulse-glow relative font-display font-bold text-[15px] text-white px-5 py-2.5 rounded-full cursor-pointer transition-transform hover:scale-105"
      style={{ background: "var(--grad-nav-pill)" }}
    >
      {cta.label}
      <span className="absolute -top-2.5 -right-3 text-[10px] font-body font-bold px-2 py-0.5 rounded-full text-[var(--gold)] bg-white border border-[rgba(245,158,11,0.45)] whitespace-nowrap shadow-sm">
        {cta.tag}
      </span>
    </button>
  );
}
