import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const LINE_PATH = "M 0,18 C 130,22 220,85 400,60 C 580,40 720,5 1000,50";
const DASH_GAP = 99999;
const COMPLETE_FRACTION = 0.45;
const DRAW_OVERSHOOT = 1.05;

const BookPath = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    lengthRef.current = line.getTotalLength();
    line.style.strokeDasharray = `0 ${DASH_GAP}`;
  }, []);

  useLenis(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    const length = lengthRef.current;
    if (!line || !container || !length) return;

    const vh = window.innerHeight;
    const rect = container.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, (vh - rect.top) / (vh * COMPLETE_FRACTION)),
    );
    line.style.strokeDasharray = `${progress * length * DRAW_OVERSHOOT} ${DASH_GAP}`;
  });

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute top-4 left-0 right-0 h-12 md:top-8 md:h-16"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <path
          ref={lineRef}
          d={LINE_PATH}
          fill="none"
          stroke="var(--color-bg-dark)"
          strokeWidth="1.4"
          strokeLinecap="butt"
          style={{ strokeDasharray: `0 ${DASH_GAP}` }}
        />
      </svg>
    </div>
  );
};

export default BookPath;
