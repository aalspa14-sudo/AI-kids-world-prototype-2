import { Award, Lock } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { SectionHeader } from "./shared";

export default function CertificateTeaser() {
  const { certificate } = USER_DATA;

  return (
    <section className="relative py-16 md:py-20">
      <div className="wrap">
        <SectionHeader
          badge={certificate.badge}
          heading={certificate.heading}
          subcopy={certificate.subcopy}
        />

        <div className="max-w-[560px] mx-auto">
          <div
            className="anim-float card relative p-8 md:p-10 text-center"
            style={{
              border: "2px solid rgba(245,158,11,0.45)",
              boxShadow: "0 2px 6px rgba(30,37,84,0.04), 0 24px 60px rgba(245,158,11,0.18)",
              animationDuration: "7s",
            }}
          >
            {/* Lock ribbon */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold text-[#5a3a00]"
              style={{ background: "linear-gradient(120deg, #ffd54a, #ffb52e)", boxShadow: "0 8px 20px rgba(245,158,11,0.35)" }}
            >
              <Lock size={12} /> Unlock by finishing the missions
            </div>

            {/* Gold seal */}
            <div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ffd54a, #ff9d2e)",
                boxShadow: "0 12px 28px rgba(245,158,11,0.4)",
              }}
            >
              <Award size={32} color="#5a3a00" />
            </div>

            <p className="mt-5 text-[11px] font-extrabold tracking-[0.3em] uppercase text-[var(--gold)]">
              {certificate.certSubtitle}
            </p>
            <h3 className="font-display font-extrabold text-3xl mt-2 hero-accent">
              {certificate.certTitle}
            </h3>

            <p className="mt-5 text-sm font-semibold text-[var(--text-muted)]">This certifies that</p>
            <p
              className="mx-auto mt-2 max-w-[300px] font-display font-bold text-xl pb-1.5 text-[var(--text-muted)]"
              style={{ borderBottom: "2px dashed rgba(93,105,190,0.4)" }}
            >
              {certificate.placeholderName}
            </p>
            <p className="mt-3 text-sm font-semibold text-[var(--text-muted)]">
              has mastered the fundamentals of Artificial Intelligence
            </p>

            {/* Skill badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {certificate.skills.map((skill) => (
                <span
                  key={skill.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white"
                  style={{ border: "1px solid rgba(93,105,190,0.2)", boxShadow: "0 6px 16px rgba(93,105,190,0.12)" }}
                >
                  <span aria-hidden="true">{skill.emoji}</span> {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
