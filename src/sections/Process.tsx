import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Stage = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly side: "left" | "right";
};

type DotPos = {
  readonly cx: number;
  readonly cy: number;
};

type TextPos = {
  readonly top: string;
  readonly width: string;
  readonly left?: string;
  readonly right?: string;
};

const STAGES: readonly Stage[] = [
  {
    number: "01.",
    title: "Analyse du projet.",
    description: "Étude des besoins et contraintes techniques.",
    side: "left",
  },
  {
    number: "02.",
    title: "Étude technique et chiffrage.",
    description: "Métré précis et estimation détaillée.",
    side: "right",
  },
  {
    number: "03.",
    title: "Planification.",
    description: "Organisation du chantier et coordination des intervenants.",
    side: "left",
  },
  {
    number: "04.",
    title: "Éxecution.",
    description: "Pilotage quotidien et contrôle qualité.",
    side: "right",
  },
  {
    number: "05.",
    title: "Livraison.",
    description: "Vérification finale et réception du chantier.",
    side: "left",
  },
];

const DOTS: readonly DotPos[] = [
  { cx: 242, cy: 95 },
  { cx: 128, cy: 265 },
  { cx: 232, cy: 440 },
  { cx: 148, cy: 615 },
  { cx: 225, cy: 795 },
];

const TEXT_POS: readonly TextPos[] = [
  { top: "5%", left: "-12%", width: "40%" },
  { top: "17%", right: "-14.5%", width: "45%" },
  { top: "38%", left: "-12%", width: "48%" },
  { top: "59%", right: "-14.5%", width: "44%" },
  { top: "70%", left: "-12%", width: "43%" },
];

const LINE_PATH =
  "M 242 95 C 198 150 86 207 128 265 C 170 323 268 375 232 440 C 196 505 88 558 148 615 C 208 672 262 732 225 795";

const FRAME_TOP_OFFSET = 80;
const FRAME_BOTTOM_OFFSET = 16;
const FINAL_STAGE_SCROLL_BUFFER_RATIO = 0.06;

const TEXT_TRANSITION = "transform 620ms cubic-bezier(0.22,1,0.36,1)";
const DOT_TRANSITION = "opacity 300ms ease-out";

const headerRevealVariants = {
  hidden: { y: "130%", opacity: 1 },
  visible: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const computeDotLengths = (path: SVGPathElement, total: number): number[] => {
  const best = DOTS.map(() => ({ length: 0, distance: Infinity }));
  const step = 1;
  for (let L = 0; L <= total; L += step) {
    const pt = path.getPointAtLength(L);
    DOTS.forEach((dot, i) => {
      const dx = pt.x - dot.cx;
      const dy = pt.y - dot.cy;
      const d2 = dx * dx + dy * dy;
      if (d2 < best[i].distance) {
        best[i] = { length: L, distance: d2 };
      }
    });
  }
  return best.map((b) => b.length);
};

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const totalLengthRef = useRef(0);
  const dotLengthsRef = useRef<number[]>([]);
  const revealedRef = useRef<boolean[]>(STAGES.map(() => false));
  const lastDashRef = useRef<number>(-1);
  const sectionMetricsRef = useRef({
    top: 0,
    maxScroll: 0,
    animationScroll: 0,
  });

  const innerDotRefs = useRef<(SVGCircleElement | null)[]>(
    DOTS.map(() => null),
  );
  const checkMarkRef = useRef<SVGPathElement | null>(null);
  const textRefs = useRef<(HTMLElement | null)[][]>(
    STAGES.map(() => [null, null, null]),
  );

  useEffect(() => {
    let lastWidth = window.innerWidth;

    const measure = () => {
      const frame = frameRef.current;
      const header = headerRef.current;
      const section = sectionRef.current;
      if (!frame || !header || !section) return;

      const vh = window.innerHeight;
      const headerH = header.offsetHeight;
      const availH = Math.max(
        0,
        vh - headerH - FRAME_TOP_OFFSET - FRAME_BOTTOM_OFFSET,
      );

      const H = Math.round(availH / 2) * 2;
      const W = Math.round((H * 380) / 900 / 2) * 2;

      frame.style.height = `${H}px`;
      frame.style.width = `${W}px`;

      const maxScroll = Math.max(0, section.offsetHeight - vh);
      const scrollBuffer = Math.round(
        maxScroll * FINAL_STAGE_SCROLL_BUFFER_RATIO,
      );

      sectionMetricsRef.current = {
        top: section.offsetTop,
        maxScroll,
        animationScroll: Math.max(0, maxScroll - scrollBuffer),
      };
    };

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        measure();
      }
    };

    measure();
    window.addEventListener("resize", handleResize);

    const fillPath = fillRef.current;
    if (fillPath) {
      const total = fillPath.getTotalLength();
      totalLengthRef.current = total;
      fillPath.style.strokeDasharray = String(total);
      fillPath.style.strokeDashoffset = String(total);
      lastDashRef.current = Math.round(total);
      dotLengthsRef.current = computeDotLengths(fillPath, total);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLenis((lenis) => {
    const fillPath = fillRef.current;
    const total = totalLengthRef.current;
    if (!fillPath || !total) return;

    const { top: sectionTop, animationScroll } = sectionMetricsRef.current;
    if (animationScroll <= 0) return;

    const scrollInSection = Math.round(lenis.scroll - sectionTop);
    const progress = Math.max(
      0,
      Math.min(1, scrollInSection / animationScroll),
    );

    const nextDash = Math.round(total * (1 - progress));
    if (Math.abs(nextDash - lastDashRef.current) > 0.5) {
      fillPath.style.strokeDashoffset = String(nextDash);
      lastDashRef.current = nextDash;
    }

    const fillLength = progress * total;
    const dotLengths = dotLengthsRef.current;
    const revealed = revealedRef.current;
    const lastIdx = dotLengths.length - 1;

    for (let i = 0; i < dotLengths.length; i++) {
      const next = fillLength > dotLengths[i];
      if (next === revealed[i]) continue;
      revealed[i] = next;

      if (i === lastIdx) {
        const check = checkMarkRef.current;
        if (check) check.style.opacity = next ? "1" : "0";
      } else {
        const inner = innerDotRefs.current[i];
        if (inner) inner.style.opacity = next ? "0" : "1";
      }

      const texts = textRefs.current[i];
      const y = next ? "translateY(0%)" : "translateY(130%)";
      if (texts[0]) texts[0].style.transform = y;
      if (texts[1]) texts[1].style.transform = y;
      if (texts[2]) texts[2].style.transform = y;
    }
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-cream">
      <div
        className="sticky top-0 h-svh overflow-hidden flex flex-col items-center pt-20"
        style={{ transform: "translateZ(0)" }}
      >
        <header ref={headerRef} className="text-center mb-2 shrink-0">
          <div className="overflow-hidden mb-4">
            <motion.p
              custom={0}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={headerRevealVariants}
              className="font-sans text-muted tracking-[0.20em] text-xs will-change-transform"
            >
              PROCESSUS
            </motion.p>
          </div>
          <h1 className="font-serif text-42 leading-title tracking-tight text-text">
            <span className="block overflow-hidden">
              <motion.span
                custom={0.1}
                initial="hidden"
                animate={isRevealed ? "visible" : "hidden"}
                variants={headerRevealVariants}
                className="block will-change-transform"
              >
                De <em>l&apos;idée</em>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                custom={0.2}
                initial="hidden"
                animate={isRevealed ? "visible" : "hidden"}
                variants={headerRevealVariants}
                className="block will-change-transform"
              >
                au chantier <em>livré</em>
                <span className="text-build-stone">.</span>
              </motion.span>
            </span>
          </h1>
        </header>

        <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
          <div ref={frameRef} className="relative">
            <svg
              viewBox="0 0 380 900"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <path
                d={LINE_PATH}
                stroke="#121212"
                opacity={0.2}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                ref={fillRef}
                d={LINE_PATH}
                stroke="#121212"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  transform: "translateZ(0)",
                }}
              />

              {DOTS.map((dot, i) =>
                i === DOTS.length - 1 ? (
                  <g key={i}>
                    <circle cx={dot.cx} cy={dot.cy} r="9" fill="#121212" />
                    <path
                      ref={(el) => {
                        checkMarkRef.current = el;
                      }}
                      d={`M ${dot.cx - 4.5} ${dot.cy + 0.5} l 3.5 3.5 l 6.5 -7`}
                      stroke="#FFF4E8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      style={{ opacity: 0, transition: DOT_TRANSITION }}
                    />
                  </g>
                ) : (
                  <g key={i}>
                    <circle cx={dot.cx} cy={dot.cy} r="6" fill="#121212" />
                    <circle
                      ref={(el) => {
                        innerDotRefs.current[i] = el;
                      }}
                      cx={dot.cx}
                      cy={dot.cy}
                      r="2.8"
                      fill="#FFF4E8"
                      style={{ opacity: 1, transition: DOT_TRANSITION }}
                    />
                  </g>
                ),
              )}
            </svg>

            {STAGES.map((stage, i) => {
              const pos = TEXT_POS[i];
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    width: pos.width,
                  }}
                >
                  <div className="overflow-hidden mb-2">
                    <p
                      ref={(el) => {
                        textRefs.current[i][0] = el;
                      }}
                      className="text-xs text-muted font-sans leading-none will-change-transform"
                      style={{
                        transform: "translateY(130%)",
                        transition: TEXT_TRANSITION,
                      }}
                    >
                      {stage.number}
                    </p>
                  </div>
                  <div className="overflow-hidden mb-2">
                    <h2
                      ref={(el) => {
                        textRefs.current[i][1] = el;
                      }}
                      className="font-serif italic leading-title text-2xl text-text will-change-transform"
                      style={{
                        transform: "translateY(130%)",
                        transition: TEXT_TRANSITION,
                        transitionDelay: "80ms",
                      }}
                    >
                      {stage.title}
                    </h2>
                  </div>
                  <div className="w-10 h-px border-none bg-linear-to-r from-border to-transparent mb-2" />
                  <div className="overflow-hidden">
                    <p
                      ref={(el) => {
                        textRefs.current[i][2] = el;
                      }}
                      className="font-sans font-light text-sm tracking-tight leading-5 text-muted will-change-transform"
                      style={{
                        transform: "translateY(130%)",
                        transition: TEXT_TRANSITION,
                        transitionDelay: "160ms",
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
