import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useRef } from "react";
import HeroImageCard from "../components/HeroImageCard";

const ABOUT_BAND_HALF_VH = 0.4;

const textRevealVariants = {
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

type HomePageMobileProps = {
  isRevealed: boolean;
};

const HomePageMobile = ({ isRevealed }: HomePageMobileProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    const content = contentRef.current;
    if (!content) return;
    const opacity =
      1 -
      Math.max(
        0,
        Math.min(1, scroll / (ABOUT_BAND_HALF_VH * window.innerHeight)),
      );
    content.style.opacity = String(opacity);
  });

  return (
    <main className="fixed inset-0 bg-cream text-text">
      <div ref={contentRef}>
        <header className="top-0 p-6 text-center">
          <div className="overflow-hidden">
            <motion.p
              custom={0}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-serif uppercase text-2xl will-change-transform"
            >
              BUILD STONE
            </motion.p>
          </div>
        </header>

        <HeroImageCard isRevealed={isRevealed} />

        <section className="p-6">
          <div className="overflow-hidden">
            <motion.h1
              custom={0.1}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-serif text-42 leading-title tracking-tight will-change-transform"
            >
              La maîtrise, du premier mur au <em>dernier détail</em>
              <span className="text-build-stone">.</span>
            </motion.h1>
          </div>
          <hr className="my-3 h-px w-48 border-none bg-linear-to-r from-border to-transparent" />
          <div className="overflow-hidden">
            <motion.p
              custom={0.2}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-sans font-light text-base text-muted tracking-tight leading-5 will-change-transform"
            >
              Prestation complète en second œuvre, aménagement d'intérieur et
              coordination de chantier.
            </motion.p>
          </div>
          <div className="-mt-2 overflow-hidden text-center">
            <motion.button
              custom={0.3}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              type="button"
              className="cursor-pointer will-change-transform text-6xl text-text"
            >
              <motion.span
                className="inline-block will-change-transform"
                animate={isRevealed ? { y: [0, 8, 0] } : { y: 0 }}
                transition={
                  isRevealed
                    ? {
                        duration: 1.8,
                        ease: [0.45, 0, 0.55, 1],
                        repeat: Infinity,
                        delay: 0.92,
                      }
                    : { duration: 0 }
                }
              >
                ↓
              </motion.span>
            </motion.button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePageMobile;
