import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const TOP_PATH = "M 0,60 C 250,15 500,140 700,115 C 850,100 960,135 1000,140";
const BOTTOM_PATH =
  "M 1000,530 C 750,485 500,615 300,580 C 150,552 50,610 0,610";

const VIEWBOX_W = 1000;
const VIEWBOX_H = 640;
const DASH_GAP = 99999;
const SAMPLES = 200;
const DRAW_OVERSHOOT = 1.08;

type PathLengths = { topLength: number; bottomLength: number };

const measurePixelLength = (
  path: SVGPathElement,
  scaleX: number,
  scaleY: number,
) => {
  const totalVB = path.getTotalLength();
  let pixelLen = 0;
  let prev = path.getPointAtLength(0);
  for (let i = 1; i <= SAMPLES; i++) {
    const p = path.getPointAtLength((totalVB * i) / SAMPLES);
    const dx = (p.x - prev.x) * scaleX;
    const dy = (p.y - prev.y) * scaleY;
    pixelLen += Math.sqrt(dx * dx + dy * dy);
    prev = p;
  }
  return pixelLen;
};

const ServicesPath = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<SVGPathElement>(null);
  const bottomRef = useRef<SVGPathElement>(null);
  const pathLengths = useRef<PathLengths>({ topLength: 0, bottomLength: 0 });

  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    const container = containerRef.current;
    if (!top || !bottom || !container) return;

    const measure = () => {
      const scaleX = container.clientWidth / VIEWBOX_W;
      const scaleY = container.clientHeight / VIEWBOX_H;
      pathLengths.current = {
        topLength: measurePixelLength(top, scaleX, scaleY) * DRAW_OVERSHOOT,
        bottomLength:
          measurePixelLength(bottom, scaleX, scaleY) * DRAW_OVERSHOOT,
      };
    };

    measure();
    top.style.strokeDasharray = `0 ${DASH_GAP}`;
    bottom.style.strokeDasharray = `0 ${DASH_GAP}`;

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLenis(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    const container = containerRef.current;
    const { topLength, bottomLength } = pathLengths.current;
    if (!top || !bottom || !container || !topLength || !bottomLength) return;

    const vh = window.innerHeight;
    const rect = container.getBoundingClientRect();

    const enterProgress = Math.max(
      0,
      Math.min(1, (0.75 * vh - rect.top) / (0.75 * vh)),
    );
    const exitProgress = Math.max(0, Math.min(1, -rect.top / (0.5 * vh)));

    const totalLength = topLength + bottomLength;
    const snakeHead = enterProgress * topLength + exitProgress * totalLength;
    const snakeTail = Math.max(0, snakeHead - topLength);

    const topVisibleEnd = Math.min(topLength, snakeHead);
    if (topVisibleEnd > snakeTail) {
      top.style.strokeDasharray = `${topVisibleEnd - snakeTail} ${DASH_GAP}`;
      top.style.strokeDashoffset = String(-snakeTail);
    } else {
      top.style.strokeDasharray = `0 ${DASH_GAP}`;
    }

    const bottomVisibleStart = Math.max(0, snakeTail - topLength);
    const bottomVisibleEnd = Math.min(
      bottomLength,
      Math.max(0, snakeHead - topLength),
    );
    if (bottomVisibleEnd > bottomVisibleStart) {
      bottom.style.strokeDasharray = `${bottomVisibleEnd - bottomVisibleStart} ${DASH_GAP}`;
      bottom.style.strokeDashoffset = String(-bottomVisibleStart);
    } else {
      bottom.style.strokeDasharray = `0 ${DASH_GAP}`;
    }
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          ref={topRef}
          d={TOP_PATH}
          fill="none"
          stroke="var(--color-bg-dark)"
          strokeWidth="2"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: `0 ${DASH_GAP}` }}
        />
        <path
          ref={bottomRef}
          d={BOTTOM_PATH}
          fill="none"
          stroke="var(--color-bg-dark)"
          strokeWidth="2"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: `0 ${DASH_GAP}` }}
        />
      </svg>
    </div>
  );
};

export default ServicesPath;
