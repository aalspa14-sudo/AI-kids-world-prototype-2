import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Building2,
  Gamepad2,
  Info,
  Menu,
  Rocket,
  School,
  ShoppingCart,
  X,
} from "lucide-react";
import { USER_DATA } from "../data/userData";
import NavTagline from "./NavTagline";
import { scrollToId } from "./shared";

const NAV_LINKS = [
  { label: "Books", href: "#book", icon: BookOpen },
  { label: "Activities", href: "#activities", icon: Gamepad2 },
  { label: "AI Playground", href: "#waitlist", icon: Rocket, featured: true, badge: "Coming Soon" },
  { label: "Parents", href: "#parents", icon: Building2 },
  { label: "Schools", href: "#waitlist", icon: School },
  { label: "About", href: "#top", icon: Info },
];

export default function Navbar() {
  const { brand } = USER_DATA;
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const updateHeaderOffset = () => {
      document.documentElement.style.setProperty(
        "--site-header-measured-height",
        `${Math.ceil(header.getBoundingClientRect().height)}px`
      );
    };

    updateHeaderOffset();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeaderOffset);
      return () => window.removeEventListener("resize", updateHeaderOffset);
    }

    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToId(href.replace("#", ""));
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="site-header fixed left-0 right-0 top-0 z-40 px-0 pt-3">
      <div className="nav-header-row mx-auto flex max-w-[1560px] items-center">
        <div className="nav-brand-area">
          <a
            href="#top"
            className="nav-brand-standalone group flex min-w-0 items-center justify-start outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/35"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileOpen(false);
            }}
          >
            <img
              src="/ai-kids-world-logo-nav-transparent.png"
              alt="AI Kids World"
              className="nav-logo-image h-auto w-auto shrink-0 object-contain object-left"
            />
          </a>
        </div>

        <div className="nav-right-stack">
          <nav
            className="nav-shell-3d nav-main-capsule relative flex min-h-[76px] items-center justify-between gap-3 rounded-[34px] px-4 py-3 sm:px-5 lg:px-6"
            aria-label="Primary navigation"
          >
            <div className="hidden items-center gap-1.5 2xl:flex 2xl:gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} link={link} onClick={handleNavClick} />
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => scrollToId("book")}
                className="nav-cta-secondary group hidden items-center gap-2 rounded-full px-4 py-3 font-display text-[14px] font-extrabold text-[var(--text-primary)] outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/35 2xl:inline-flex"
              >
                <BookOpen size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Preview Book
              </button>
              <AmazonButton href={brand.amazonUrl} compact />
              <AmazonButton href={brand.amazonUrl} className="hidden md:inline-flex" />
              <button
                type="button"
                className="nav-icon-button inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/35 2xl:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
          <NavTagline />
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="nav-mobile-panel nav-mobile-3d mx-auto mt-3 max-w-[1560px] rounded-[26px] p-3 backdrop-blur-2xl 2xl:hidden"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.label} link={link} onClick={handleNavClick} />
            ))}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                scrollToId("book");
                setMobileOpen(false);
              }}
              className="nav-cta-secondary inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl px-4 py-3 font-display text-[15px] font-extrabold text-[var(--text-primary)] outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/35"
            >
              <BookOpen size={18} aria-hidden="true" />
              Preview Book
            </button>
            <AmazonButton href={brand.amazonUrl} mobile onClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ link, onClick }) {
  const Icon = link.icon;

  if (link.featured) {
    return (
      <a
        href={link.href}
        onClick={(e) => onClick(e, link.href)}
        className="nav-featured-pill group relative inline-flex min-h-[52px] items-center gap-2 rounded-full px-4 py-2 font-display text-[14px] font-extrabold outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/35 2xl:px-5"
      >
        <span className="nav-featured-icon grid h-8 w-8 place-items-center rounded-full text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
          <Icon size={17} aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-none">
          <span>AI Playground</span>
          <span className="playground-badge mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.04em]">
            {link.badge}
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      className="nav-link-pill group inline-flex min-h-[48px] items-center gap-2 rounded-full px-3.5 py-2 font-display text-[14px] font-extrabold outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/35 2xl:px-4"
    >
      <Icon size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
      {link.label}
    </a>
  );
}

function MobileNavLink({ link, onClick }) {
  const Icon = link.icon;

  return (
    <a
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      className={`group flex min-h-[58px] items-center justify-between gap-3 rounded-2xl px-4 py-3 font-display text-[16px] font-extrabold outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 ${
        link.featured
          ? "nav-featured-pill focus-visible:ring-white/35"
          : "nav-link-pill focus-visible:ring-white/35"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="nav-featured-icon grid h-10 w-10 place-items-center rounded-2xl text-white transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon size={19} aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-tight">
          {link.label}
          {link.badge && (
            <span className="playground-badge mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.04em]">
              {link.badge}
            </span>
          )}
        </span>
      </span>
    </a>
  );
}

function AmazonButton({ href, compact = false, mobile = false, className = "", onClick }) {
  const label = compact ? "Buy" : "Buy on Amazon";
  const visibility = compact ? "hidden sm:inline-flex md:hidden" : className;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`nav-amazon-3d group min-h-[48px] items-center justify-center gap-2 rounded-full px-4 py-3 font-display text-[14px] font-extrabold text-white outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[rgba(168,85,247,0.34)] ${mobile ? "inline-flex min-h-[54px] text-[15px]" : visibility}`}
    >
      <ShoppingCart size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
      {label}
    </a>
  );
}
