import { Star, ShoppingCart, Gamepad2, ShieldCheck, Users, Lock } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { RainbowText, ACCENTS, scrollToId } from "./shared";
import FloatingBook from "./FloatingBook";

const TRUST_ICONS = { ShieldCheck, Users, Lock };

export default function Hero() {
  const { hero, brand } = USER_DATA;

  return (
    <section id="top" className="relative pt-14 pb-10 md:pt-20 md:pb-14">
      <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
        {/* Copy */}
        <div>
          <h1 className="h1-hero">
            <RainbowText text={hero.headlineRainbow} />{" "}
            <span className="text-[var(--text-primary)]">{hero.headlineDark}</span>
          </h1>

          <p className="mt-4 font-display font-bold text-xl md:text-2xl leading-snug">
            {hero.subheadline.map((part, i) => (
              <span key={i} style={part.color ? { color: ACCENTS[part.color].color } : undefined}>
                {part.text}
              </span>
            ))}
          </p>

          <p className="mt-4 text-[var(--text-muted)] text-lg max-w-[480px]">{hero.subcopy}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={brand.amazonUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <ShoppingCart size={20} />
              {hero.primaryCta.label} {hero.primaryCta.emoji}
            </a>
            <button className="btn-ghost" onClick={() => scrollToId(hero.secondaryCta.targetId)}>
              <Gamepad2 size={20} />
              {hero.secondaryCta.label} {hero.secondaryCta.emoji}
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {hero.trustRow.map((item) => {
              const Icon = TRUST_ICONS[item.icon];
              const accent = ACCENTS[item.color];
              return (
                <span key={item.label} className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)]">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: accent.bg, color: accent.color }}
                  >
                    {Icon && <Icon size={14} />}
                  </span>
                  {item.label}
                </span>
              );
            })}
          </div>

          {/* Rating row */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-0.5" aria-label={`${hero.rating.stars} out of 5 stars`}>
              {Array.from({ length: hero.rating.stars }).map((_, i) => (
                <Star key={i} size={16} fill="var(--gold)" stroke="var(--gold)" />
              ))}
            </div>
            <span className="text-sm text-[var(--text-muted)] font-semibold">{hero.rating.text}</span>
          </div>
        </div>

        {/* Floating 3D book — cover is a drop-in image slot (public/book-cover.png) */}
        <FloatingBook />
      </div>
    </section>
  );
}
