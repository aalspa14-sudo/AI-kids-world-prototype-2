import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { SectionHeader } from "./shared";

const ACCENT_VARS = {
  cyan: "var(--cyan)",
  green: "var(--green)",
  pink: "var(--pink)",
  gold: "var(--gold)",
  purple: "var(--purple)",
};

export default function BookPreview() {
  const { bookPreview } = USER_DATA;
  const pages = bookPreview.pages;
  const [index, setIndex] = useState(0);

  const go = (delta) => setIndex((i) => (i + delta + pages.length) % pages.length);
  const page = pages[index];
  const accent = ACCENT_VARS[page.accent] ?? "var(--purple)";

  return (
    <section id="book" className="relative py-16 md:py-20">
      <div className="wrap">
        <SectionHeader
          badge={bookPreview.badge}
          heading={bookPreview.heading}
          subcopy={bookPreview.subcopy}
        />

        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-3 md:gap-5">
            <CarouselArrow onClick={() => go(-1)} label="Previous page">
              <ChevronLeft size={22} />
            </CarouselArrow>

            {/* Page card — keyed so each page re-runs the pop animation */}
            <article
              key={index}
              className="card anim-pop flex-1 p-8 md:p-10 text-center min-h-[320px] flex flex-col items-center justify-center"
              style={{ borderTop: `5px solid ${accent}` }}
            >
              <span
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl"
                style={{ background: `${accent}1a` }}
                aria-hidden="true"
              >
                {page.emoji}
              </span>
              <span className="mt-5 text-xs font-extrabold tracking-[0.2em] uppercase" style={{ color: accent }}>
                {page.chapter}
              </span>
              <h3 className="font-display font-bold text-2xl mt-2">{page.title}</h3>
              <p className="mt-3 text-[var(--text-muted)] font-semibold max-w-[480px]">{page.text}</p>
            </article>

            <CarouselArrow onClick={() => go(1)} label="Next page">
              <ChevronRight size={22} />
            </CarouselArrow>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-6">
            {pages.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setIndex(i)}
                aria-label={`Go to page ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                style={{
                  background: i === index ? "var(--grad-primary-btn)" : "rgba(93,105,190,0.25)",
                  transform: i === index ? "scale(1.35)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 bg-white text-[var(--text-primary)]"
      style={{ border: "var(--border-glow)", boxShadow: "0 10px 26px rgba(93,105,190,0.15)" }}
    >
      {children}
    </button>
  );
}
