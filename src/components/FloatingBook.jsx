import { useState } from "react";
import { USER_DATA } from "../data/userData";

/**
 * Floating 3D book for the hero. The cover face is a drop-in image slot:
 * put the real cover at public/book-cover.png and it replaces the
 * placeholder automatically (path/alt configured in hero.bookCover).
 */
export default function FloatingBook() {
  const { bookCover } = USER_DATA.hero;
  const [coverLoaded, setCoverLoaded] = useState(false);

  return (
    <div className="relative flex justify-center items-center py-10 lg:py-0">
      {/* Soft glow behind the book */}
      <div
        aria-hidden="true"
        className="absolute w-[340px] h-[340px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(139,61,255,0.25), rgba(47,107,255,0.12), transparent 70%)" }}
      />

      <div className="anim-float" style={{ animationDuration: "6s", perspective: "1200px" }}>
        <div
          className="relative w-[260px] h-[370px] md:w-[300px] md:h-[430px]"
          style={{ transformStyle: "preserve-3d", transform: "rotateY(-22deg) rotateX(4deg)" }}
        >
          {/* Page block (right edge) */}
          <div
            aria-hidden="true"
            className="absolute top-[6px] bottom-[6px] right-[-14px] w-[26px] rounded-r-md"
            style={{
              background:
                "repeating-linear-gradient(to right, #ffffff 0px, #ffffff 2px, #e7e9f4 3px, #ffffff 4px)",
              transform: "rotateY(60deg)",
              transformOrigin: "left center",
              boxShadow: "inset -4px 0 8px rgba(30,37,84,0.12)",
            }}
          />

          {/* Spine (left edge) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[-18px] w-[36px] rounded-l-xl"
            style={{
              background: "linear-gradient(135deg, #5a2bb8, #2451c9)",
              transform: "rotateY(-72deg)",
              transformOrigin: "right center",
              boxShadow: "inset 6px 0 12px rgba(0,0,0,0.25)",
            }}
          />

          {/* Cover face */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-lg overflow-hidden"
            style={{
              boxShadow: "0 34px 70px rgba(93,105,190,0.35), 0 8px 20px rgba(30,37,84,0.18)",
            }}
          >
            {/* Real cover art - shown once it loads */}
            <img
              src={bookCover.src}
              alt={bookCover.alt}
              onLoad={() => setCoverLoaded(true)}
              className={coverLoaded ? "w-full h-full object-cover" : "hidden"}
            />

            {/* Placeholder cover - replaced by book-cover.png automatically */}
            {!coverLoaded && (
              <div
                className="w-full h-full flex flex-col items-center justify-between text-center px-6 py-8"
                style={{ background: "var(--grad-book-cover)" }}
              >
                <span className="text-white/85 font-display font-bold text-xs tracking-[0.25em] uppercase">
                  {bookCover.placeholderTagline}
                </span>

                <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl" aria-hidden="true">{bookCover.placeholderEmoji}</span>
                  <span className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
                    {bookCover.placeholderTitle}
                  </span>
                </div>

                <span className="text-white/70 text-xs font-bold border border-white/40 border-dashed rounded-full px-4 py-1.5">
                  Cover art coming soon
                </span>
              </div>
            )}

            {/* Sheen + edge shading over whichever cover is showing */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0.28) 0%, transparent 28%), linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 8%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 lg:bottom-8 w-[240px] h-[30px] rounded-full blur-xl opacity-40"
        style={{ background: "rgba(30,37,84,0.45)" }}
      />
    </div>
  );
}
