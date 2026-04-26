import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type EntryLoaderProps = {
  onComplete: () => void;
};

const FAST_PHASE_DURATION_MS = 1400;
const SLOW_PHASE_DURATION_MS = 950;
const COMPLETE_HOLD_MS = 220;
const IMAGE_CLEAR_DURATION_MS = 260;
const TEXT_STAGGER_MS = 200;
const INITIAL_DELAY_MS = 250;
const TEXT_EXIT_DURATION_MS = 240;
const TEXT_EXIT_LAST_DELAY_MS = INITIAL_DELAY_MS + 60;
const POST_EXIT_HOLD_MS = 150;

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const textSlideVariants = {
  hidden: {
    y: "130%",
    opacity: 1,
  },
  enter: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: (delay: number) => ({
    y: "-120%",
    opacity: 1,
    transition: {
      duration: TEXT_EXIT_DURATION_MS / 1000,
      delay,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

const EntryLoader = ({ onComplete }: EntryLoaderProps) => {
  const [isImageClearing, setIsImageClearing] = useState(false);
  const [isTextExiting, setIsTextExiting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const clipRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLParagraphElement | null>(null);

  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    let animationFrameId = 0;
    let startTimeoutId = 0;
    let clearImageTimeoutId = 0;
    let textExitTimeoutId = 0;
    let exitTimeoutId = 0;
    let isActive = true;
    let animationStart = 0;
    let lastDisplayed = -1;

    const totalDuration =
      FAST_PHASE_DURATION_MS + SLOW_PHASE_DURATION_MS + COMPLETE_HOLD_MS;

    const applyProgress = (value: number) => {
      const clamped = Math.min(Math.max(value, 0), 100);
      if (clipRef.current) {
        clipRef.current.style.clipPath = `inset(${100 - clamped}% 0 0 0)`;
      }
      const display = clamped >= 100 ? 100 : Math.floor(clamped);
      if (display !== lastDisplayed && progressTextRef.current) {
        progressTextRef.current.textContent = String(display);
        lastDisplayed = display;
      }
    };

    const updateProgress = (currentTime: number) => {
      if (!isActive) {
        return;
      }

      const elapsed = currentTime - animationStart;

      if (elapsed <= FAST_PHASE_DURATION_MS) {
        const phaseProgress = elapsed / FAST_PHASE_DURATION_MS;
        applyProgress(90 * easeOutCubic(phaseProgress));
        animationFrameId = window.requestAnimationFrame(updateProgress);
        return;
      }

      if (elapsed <= totalDuration - COMPLETE_HOLD_MS) {
        const phaseProgress =
          (elapsed - FAST_PHASE_DURATION_MS) / SLOW_PHASE_DURATION_MS;
        applyProgress(90 + 10 * easeOutCubic(phaseProgress));
        animationFrameId = window.requestAnimationFrame(updateProgress);
        return;
      }

      applyProgress(100);
      clearImageTimeoutId = window.setTimeout(() => {
        if (isActive) {
          setIsImageClearing(true);
          textExitTimeoutId = window.setTimeout(() => {
            if (isActive) setIsTextExiting(true);
          }, TEXT_STAGGER_MS);
          exitTimeoutId = window.setTimeout(
            () => {
              if (isActive) setIsExiting(true);
            },
            TEXT_STAGGER_MS +
              TEXT_EXIT_LAST_DELAY_MS +
              TEXT_EXIT_DURATION_MS +
              POST_EXIT_HOLD_MS,
          );
        }
      }, COMPLETE_HOLD_MS);
    };

    const startAnimation = () => {
      if (!isActive) return;
      animationStart = performance.now();
      animationFrameId = window.requestAnimationFrame(updateProgress);
    };

    const preloadImage = new Image();
    preloadImage.src = "/images/loader-image.jpg";
    const decoded =
      typeof preloadImage.decode === "function"
        ? preloadImage.decode().catch(() => undefined)
        : Promise.resolve();

    startTimeoutId = window.setTimeout(() => {
      decoded.then(startAnimation);
    }, TEXT_STAGGER_MS + INITIAL_DELAY_MS);

    return () => {
      isActive = false;
      window.clearTimeout(startTimeoutId);
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(clearImageTimeoutId);
      window.clearTimeout(textExitTimeoutId);
      window.clearTimeout(exitTimeoutId);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isExiting ? 0 : 1,
      }}
      transition={{
        opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
      onAnimationComplete={() => {
        if (!isExiting) {
          return;
        }

        setIsVisible(false);
        onComplete();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream px-6"
      style={{ willChange: "opacity" }}
    >
      <div className="w-full max-w-40">
        <div className="mb-2 flex items-center justify-between font-sans text-[1rem] uppercase font-medium">
          <div className="h-[0.9rem] overflow-hidden">
            <motion.p
              custom={INITIAL_DELAY_MS / 1000}
              initial="hidden"
              animate={isTextExiting ? "exit" : "enter"}
              variants={textSlideVariants}
              className="leading-none will-change-transform"
            >
              BUILD STONE
            </motion.p>
          </div>

          <div className="h-[0.9rem] overflow-hidden">
            <motion.p
              custom={TEXT_EXIT_LAST_DELAY_MS / 1000}
              initial="hidden"
              animate={isTextExiting ? "exit" : "enter"}
              variants={textSlideVariants}
              className="leading-none will-change-transform"
            >
              <span ref={progressTextRef}>0</span>
            </motion.p>
          </div>
        </div>

        <div className="relative aspect-4/5 overflow-hidden">
          {isImageClearing ? (
            <motion.div
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{
                duration: IMAGE_CLEAR_DURATION_MS / 1000,
                ease: [0.32, 0, 0.2, 1],
              }}
              className="absolute inset-0 overflow-hidden"
              style={{ willChange: "clip-path" }}
            >
              <img
                src="/images/loader-image.jpg"
                alt=""
                aria-hidden="true"
                draggable={false}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ) : (
            <div
              ref={clipRef}
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "inset(100% 0 0 0)",
                willChange: "clip-path",
              }}
            >
              <img
                src="/images/loader-image.jpg"
                alt=""
                aria-hidden="true"
                draggable={false}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EntryLoader;
