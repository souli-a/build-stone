import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useRef } from "react";

const FADE_RANGE_VH = 0.4;
const PARALLAX_FACTOR = 0.35;

const HomePageDesktop = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLenis(({ scroll }) => {
    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    const vh = window.innerHeight;
    const opacity = 1 - Math.max(0, Math.min(1, scroll / (FADE_RANGE_VH * vh)));
    content.style.opacity = String(opacity);

    image.style.transform = `translate3d(0, ${-scroll * PARALLAX_FACTOR}px, 0)`;
  });

  return (
    <main className="fixed inset-0 bg-cream text-text overflow-hidden">
      <div ref={contentRef} className="absolute inset-0">
        <img
          ref={imageRef}
          src="/images/homepage-image-desktop.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          fetchPriority="high"
          className="absolute top-0 left-0 w-full object-cover will-change-transform"
        />
        <div className="relative flex flex-col items-center justify-center h-full w-full font-serif text-cream">
          <div className="flex flex-col items-start w-fit">
            <h1 className="text-9xl">BUILD STONE</h1>
            <div className="flex gap-5 w-full items-center justify-center">
              <h2 className="text-3xl leading-[94%]">
                La maîtrise, du premier mur <br />
                au dernier détail
                <span className="text-build-stone text-42">.</span>
              </h2>
              <hr className="my-3 h-px border-none bg-linear-to-r from-border to-transparent w-73" />
            </div>
            <div className="mt-6 w-full text-center">
              <button
                type="button"
                className="cursor-pointer text-6xl text-cream"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.8,
                    ease: [0.45, 0, 0.55, 1],
                    repeat: Infinity,
                  }}
                >
                  ↓
                </motion.span>
              </button>
            </div>
          </div>

          <span className="absolute bottom-6 left-6 font-sans text-base uppercase">
            Entreprise tout corps d'état
          </span>
          <span className="absolute bottom-6 right-6 font-sans text-base uppercase">
            Aménagement d'intérieur | Rénovation d'intérieure
          </span>
        </div>
      </div>
    </main>
  );
};

export default HomePageDesktop;
