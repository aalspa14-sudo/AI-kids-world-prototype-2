import { useState } from "react";
import { Rocket, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { USER_DATA } from "../data/userData";
import { SectionHeader } from "./shared";

/**
 * Mission Control — gamified waitlist. Identical logic to prototype 1.
 * fakeSubscribe() simulates a provider call (e.g. Loops.so); swap its body
 * for a real `fetch` when the API key is ready.
 */
function fakeSubscribe(email) {
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true, email }), 1400));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Waitlist() {
  const { waitlist } = USER_DATA;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const signups = waitlist.currentSignups + (status === "success" ? 1 : 0);
  const finalMilestone = waitlist.milestones[waitlist.milestones.length - 1].count;
  const progress = Math.min(100, Math.round((signups / finalMilestone) * 100));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await fakeSubscribe(email);
    setStatus("success");
  };

  return (
    <section id="waitlist" className="relative py-16 md:py-20">
      <div className="wrap">
        <div className="card max-w-[760px] mx-auto p-8 md:p-12">
          <SectionHeader
            badge={waitlist.badge}
            heading={waitlist.heading}
            subcopy={waitlist.subcopy}
          />

          {status === "success" ? (
            <SuccessState waitlist={waitlist} />
          ) : (
            <form onSubmit={handleSubmit} className="max-w-[520px] mx-auto" noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={waitlist.inputPlaceholder}
                  aria-label="Parent email address"
                  className="flex-1 rounded-full px-6 py-4 text-[15px] font-bold outline-none text-[var(--text-primary)] placeholder-[#9aa1c2] focus:border-[var(--purple)] transition-colors"
                  style={{ background: "var(--surface)", border: "1.5px solid rgba(93,105,190,0.2)" }}
                />
                <button type="submit" className="btn-primary justify-center" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Launching…
                    </>
                  ) : (
                    <>
                      <Rocket size={20} /> {waitlist.buttonLabel} {waitlist.buttonEmoji}
                    </>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p className="anim-pop mt-3 text-center text-sm font-extrabold text-[var(--pink)]">
                  Hmm, that email doesn't look right — one more try, Captain! 🛸
                </p>
              )}
            </form>
          )}

          {/* Milestones */}
          <div className="mt-10">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--text-muted)]">
                Crew progress
              </span>
              <span className="font-display font-bold text-[var(--green)]">
                {signups.toLocaleString()} families aboard
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(93,105,190,0.14)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: "var(--grad-primary-btn)" }}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-5">
              {waitlist.milestones.map((m) => {
                const unlocked = signups >= m.count;
                return (
                  <div
                    key={m.count}
                    className="rounded-2xl p-4 text-center transition-opacity"
                    style={{
                      background: unlocked ? "rgba(34,197,94,0.08)" : "var(--surface)",
                      border: unlocked ? "1.5px solid rgba(34,197,94,0.4)" : "1px solid rgba(93,105,190,0.14)",
                      opacity: unlocked ? 1 : 0.85,
                    }}
                  >
                    <span className="text-2xl" aria-hidden="true">{m.emoji}</span>
                    <p className="font-display font-bold text-sm mt-1.5">
                      {m.count.toLocaleString()} signups
                    </p>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mt-1">{m.reward}</p>
                    {unlocked && (
                      <p className="text-[11px] font-extrabold text-[var(--green)] mt-1.5">✓ UNLOCKED</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-muted)]">
            <ShieldCheck size={14} className="text-[var(--green)]" /> {waitlist.trustRow}
          </p>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ waitlist }) {
  return (
    <div className="anim-pop text-center py-6">
      <CheckCircle2 size={56} className="mx-auto text-[var(--green)] drop-shadow-[0_10px_24px_rgba(34,197,94,0.4)]" />
      <h3 className="font-display font-bold text-2xl mt-4">{waitlist.successTitle}</h3>
      <p className="mt-2 text-[var(--text-muted)] font-semibold max-w-[420px] mx-auto">{waitlist.successText}</p>
    </div>
  );
}
