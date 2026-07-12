import { Brain, Palette, Code2, Gamepad2, Sprout, ChevronRight } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { ACCENTS } from "./shared";

const ICONS = { Brain, Palette, Code2, Gamepad2, Sprout };

/** Reference-style feature tile row: Learn AI / Create / Code / Play / Grow. */
export default function FeatureTiles() {
  return (
    <section className="relative pb-14">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {USER_DATA.featureTiles.map((tile) => {
            const Icon = ICONS[tile.icon];
            const accent = ACCENTS[tile.color];
            return (
              <article
                key={tile.title}
                className="card group p-5 transition-transform duration-300 hover:-translate-y-1.5 cursor-default"
              >
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: accent.bg, color: accent.color, boxShadow: `0 10px 24px ${accent.color}33` }}
                >
                  {Icon && <Icon size={27} />}
                </span>
                <h3 className="font-display font-bold text-[17px] mt-4">{tile.title}</h3>
                <p className="text-[13px] text-[var(--text-muted)] font-semibold mt-1 leading-snug">{tile.text}</p>
                <span
                  className="mt-3 inline-flex w-6 h-6 rounded-full items-center justify-center transition-transform group-hover:translate-x-1"
                  style={{ background: accent.bg, color: accent.color }}
                >
                  <ChevronRight size={14} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
