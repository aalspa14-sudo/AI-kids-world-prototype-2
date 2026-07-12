import { useState } from "react";
import { USER_DATA } from "../data/userData";
import { SectionHeader, ACCENTS } from "./shared";

/**
 * Meet the Characters — three cards for the book's cast. Each portrait is a
 * drop-in image slot: put art at the path configured in characters.cast[n]
 * .image.src (public/characters/...) and it replaces the emoji placeholder
 * automatically.
 */
export default function Characters() {
  const { characters } = USER_DATA;

  return (
    <section id="characters" className="relative py-16 md:py-20">
      <div className="wrap">
        <SectionHeader
          badge={characters.badge}
          heading={characters.heading}
          subcopy={characters.subcopy}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {characters.cast.map((character) => (
            <article
              key={character.name}
              className="card overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
            >
              <CharacterPortrait character={character} />
              <div className="p-7 pt-5">
                <span
                  className="inline-block text-xs font-bold rounded-full px-3 py-1"
                  style={{ color: ACCENTS[character.color].color, background: ACCENTS[character.color].bg }}
                >
                  {character.role}
                </span>
                <h3 className="font-display font-bold text-xl mt-3">{character.name}</h3>
                <p className="mt-2.5 text-sm text-[var(--text-muted)] font-semibold leading-relaxed">
                  {character.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CharacterPortrait({ character }) {
  const [loaded, setLoaded] = useState(false);
  const accent = ACCENTS[character.color];

  return (
    <div className="relative aspect-[4/3]">
      {/* Real art — shown once it loads */}
      <img
        src={character.image.src}
        alt={character.image.alt}
        onLoad={() => setLoaded(true)}
        className={loaded ? "w-full h-full object-cover" : "hidden"}
      />

      {/* Placeholder — replaced automatically when the image file exists */}
      {!loaded && (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: `linear-gradient(150deg, ${accent.bg}, rgba(255,255,255,0.6))` }}
        >
          <span className="text-6xl anim-bob" aria-hidden="true">{character.emoji}</span>
          <span
            className="text-xs font-bold border border-dashed rounded-full px-4 py-1.5"
            style={{ color: accent.color, borderColor: accent.color }}
          >
            Image coming soon
          </span>
        </div>
      )}
    </div>
  );
}
