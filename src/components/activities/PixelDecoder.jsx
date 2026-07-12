import { useMemo, useState } from "react";
import { ScanSearch, RotateCcw, Wand2 } from "lucide-react";
import { USER_DATA } from "../../data/userData";
import { IconChip } from "../shared";

/**
 * Activity 2 — teaches computer vision: images are just grids of numbers.
 * Identical logic to prototype 1; light-theme styling only.
 */
export default function PixelDecoder() {
  const config = USER_DATA.activities.pixelDecoder;
  const grid = config.grid;
  const rows = grid.length;
  const cols = grid[0].length;

  const [revealed, setRevealed] = useState(() => new Set());
  const [lens, setLens] = useState(null); // {x, y} inside the grid, for the 🔍 cursor

  // Cells that belong to the hidden shape (non-zero values).
  const shapeCells = useMemo(() => {
    const cells = new Set();
    grid.forEach((row, r) => row.forEach((v, c) => v > 0 && cells.add(`${r}-${c}`)));
    return cells;
  }, [grid]);

  const revealedShapeCount = useMemo(
    () => [...revealed].filter((key) => shapeCells.has(key)).length,
    [revealed, shapeCells]
  );
  const progress = Math.round((revealedShapeCount / shapeCells.size) * 100);
  const isComplete = progress === 100;

  // Reveal a 3x3 "lens" window around the touched cell.
  const scanCell = (r, c) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) next.add(`${rr}-${cc}`);
        }
      }
      return next;
    });
  };

  const revealAll = () => {
    const all = new Set();
    grid.forEach((row, r) => row.forEach((_, c) => all.add(`${r}-${c}`)));
    setRevealed(all);
  };

  return (
    <article className="card p-7 md:p-8 flex flex-col">
      <header className="flex items-start gap-4">
        <IconChip chip={config.chip}>
          <ScanSearch size={26} />
        </IconChip>
        <div>
          <h3 className="font-display font-bold text-xl">{config.title}</h3>
          <p className="text-sm font-semibold text-[var(--text-muted)]">{config.tagline}</p>
        </div>
      </header>

      {/* Scan progress */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex-1 h-2.5 rounded-full overflow-hidden"
          style={{ background: "rgba(93,105,190,0.14)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "var(--grad-primary-btn)" }}
          />
        </div>
        <span className="font-display font-bold text-sm text-[var(--purple)] w-20 text-right">
          {isComplete ? "DECODED" : `${progress}% scan`}
        </span>
      </div>

      {/* Sensor grid */}
      <div
        className="relative mt-4 mx-auto touch-none select-none"
        style={{ cursor: "none" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setLens(null)}
      >
        <div
          className="grid gap-[3px] p-3 rounded-2xl"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            background: "var(--surface)",
            border: "1px solid rgba(93,105,190,0.14)",
          }}
        >
          {grid.map((row, r) =>
            row.map((value, c) => {
              const isRevealed = revealed.has(`${r}-${c}`);
              return (
                <div
                  key={`${r}-${c}`}
                  onMouseEnter={() => scanCell(r, c)}
                  onTouchStart={() => scanCell(r, c)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-[6px] flex items-center justify-center text-[11px] font-bold transition-colors duration-200"
                  style={
                    isRevealed
                      ? {
                          // 0 = white → 9 = black
                          background: `rgb(${255 - value * 28}, ${255 - value * 28}, ${255 - value * 26})`,
                          color: value >= 5 ? "#ffffff" : "#1e2554",
                          border: "1px solid rgba(30,37,84,0.1)",
                        }
                      : {
                          background: "rgba(124,58,237,0.08)",
                          border: "1px solid rgba(124,58,237,0.14)",
                        }
                  }
                >
                  {isRevealed ? value : ""}
                </div>
              );
            })
          )}
        </div>

        {/* Magnifying glass that follows the cursor */}
        {lens && (
          <span
            className="absolute text-3xl pointer-events-none drop-shadow-[0_4px_10px_rgba(124,58,237,0.5)]"
            style={{ left: lens.x, top: lens.y, transform: "translate(-50%, -55%)" }}
            aria-hidden="true"
          >
            🔍
          </span>
        )}
      </div>

      {/* Status + controls */}
      <div className="mt-4 flex-1">
        {isComplete ? (
          <p className="anim-pop text-center font-bold text-[var(--gold)]">{config.revealedMessage}</p>
        ) : (
          <p className="text-center text-sm font-semibold text-[var(--text-muted)]">
            Sweep the lens over the sensor grid to decode the hidden shape…
          </p>
        )}
        <div className="flex justify-center gap-3 mt-4">
          <button className="btn-ghost !py-2 !px-4 !text-sm" onClick={() => setRevealed(new Set())}>
            <RotateCcw size={15} /> Reset
          </button>
          <button className="btn-ghost !py-2 !px-4 !text-sm" onClick={revealAll}>
            <Wand2 size={15} /> Auto-decode
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs text-[var(--text-muted)] font-semibold leading-relaxed border-t border-[rgba(93,105,190,0.12)] pt-4">
        💡 {config.explainer}
      </p>
    </article>
  );
}
