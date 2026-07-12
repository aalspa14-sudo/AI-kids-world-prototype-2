import { GraduationCap, Briefcase, FolderOpen, Users, ShieldCheck } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { ACCENTS } from "./shared";

const ICONS = { GraduationCap, Briefcase, FolderOpen, Users, ShieldCheck };

/** Reference-style stats strip: white pill row with colorful icon chips. */
export default function StatsBar() {
  return (
    <section className="relative pb-8">
      <div className="wrap">
        <div className="card px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
          {USER_DATA.stats.map((stat) => {
            const Icon = ICONS[stat.icon];
            const accent = ACCENTS[stat.color];
            return (
              <div key={stat.label} className="flex items-center gap-3 justify-center">
                <span
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: accent.bg, color: accent.color }}
                >
                  {Icon && <Icon size={21} />}
                </span>
                <span>
                  <span className="block font-display font-extrabold text-lg leading-tight" style={{ color: accent.color }}>
                    {stat.value}
                  </span>
                  <span className="block text-[13px] font-bold text-[var(--text-muted)]">{stat.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
