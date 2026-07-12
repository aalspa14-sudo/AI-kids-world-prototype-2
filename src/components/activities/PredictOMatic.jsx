import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { USER_DATA } from "../../data/userData";
import { IconChip } from "../shared";

/**
 * Activity 1 — teaches how LLMs pick the next word by probability.
 * Identical logic to prototype 1; light-theme styling only.
 */
export default function PredictOMatic() {
  const config = USER_DATA.activities.predictOMatic;
  const [chosenWords, setChosenWords] = useState([]);

  const stepIndex = chosenWords.length;
  const isComplete = stepIndex >= config.steps.length;
  const currentStep = config.steps[stepIndex];

  return (
    <article className="card p-7 md:p-8 flex flex-col">
      <header className="flex items-start gap-4">
        <IconChip chip={config.chip}>
          <Sparkles size={26} />
        </IconChip>
        <div>
          <h3 className="font-display font-bold text-xl">{config.title}</h3>
          <p className="text-sm font-semibold text-[var(--text-muted)]">{config.tagline}</p>
        </div>
      </header>

      {/* Sentence display */}
      <div
        className="mt-6 rounded-2xl p-5 min-h-[96px] font-display text-lg leading-relaxed"
        style={{ background: "var(--surface)", border: "1px solid rgba(93,105,190,0.12)" }}
        aria-live="polite"
      >
        {config.baseSentence}
        {chosenWords.map((word, i) => (
          <span key={i} className="anim-pop inline-block ml-1.5 text-[var(--purple)] font-bold">
            {word}
          </span>
        ))}
        {!isComplete && <span className="ml-1.5 animate-pulse text-[var(--blue)]">▍</span>}
      </div>

      {/* Word options or completion state */}
      <div className="mt-5 flex-1">
        {isComplete ? (
          <div className="anim-pop text-center py-3">
            <p className="font-bold text-[var(--gold)]">{config.completedMessage}</p>
            <button className="btn-ghost mt-4 !py-2.5 !px-5 !text-sm" onClick={() => setChosenWords([])}>
              <RotateCcw size={16} /> Predict again
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3">
              Pick the next word — % = how likely the AI thinks it is
            </p>
            <div className="grid gap-2.5">
              {currentStep.options.map((option) => (
                <WordOption
                  key={option.word}
                  option={option}
                  onPick={() => setChosenWords((words) => [...words, option.word])}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <p className="mt-5 text-xs text-[var(--text-muted)] font-semibold leading-relaxed border-t border-[rgba(93,105,190,0.12)] pt-4">
        💡 {config.explainer}
      </p>
    </article>
  );
}

function WordOption({ option, onPick }) {
  return (
    <button
      onClick={onPick}
      className="relative overflow-hidden rounded-xl px-4 py-3 text-left font-bold cursor-pointer transition-all hover:scale-[1.02] hover:-translate-y-0.5 bg-white hover:shadow-[0_10px_24px_rgba(93,105,190,0.18)]"
      style={{ border: "1px solid rgba(93,105,190,0.18)" }}
    >
      {/* Probability fill bar */}
      <span
        className="absolute inset-y-0 left-0 opacity-15"
        style={{ width: `${option.probability}%`, background: "var(--grad-primary-btn)" }}
        aria-hidden="true"
      />
      <span className="relative flex items-center justify-between gap-3">
        <span>{option.word}</span>
        <span className="font-display font-bold text-[var(--purple)]">{option.probability}%</span>
      </span>
    </button>
  );
}
