import { ShieldCheck, BookOpen, Eye } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { SectionHeader, IconChip } from "./shared";

// Icon names in USER_DATA resolve here, keeping the config serializable.
const ICONS = { ShieldCheck, BookOpen, Eye };

export default function ForParents() {
  const { forParents } = USER_DATA;

  return (
    <section id="parents" className="relative py-16 md:py-20">
      <div className="wrap">
        <SectionHeader
          badge={forParents.badge}
          heading={forParents.heading}
          subcopy={forParents.intro}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {forParents.points.map((point) => {
            const Icon = ICONS[point.icon];
            return (
              <article
                key={point.title}
                className="card p-7 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <IconChip chip={point.chip}>{Icon && <Icon size={26} />}</IconChip>
                <h3 className="font-display font-bold text-xl mt-5">{point.title}</h3>
                <p className="mt-2.5 text-sm text-[var(--text-muted)] font-semibold leading-relaxed">{point.text}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center font-display font-bold text-lg max-w-[560px] mx-auto text-[var(--purple)]">
          “{forParents.reassurance}”
        </p>
      </div>
    </section>
  );
}
