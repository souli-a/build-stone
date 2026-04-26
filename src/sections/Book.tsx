import { Float, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import BookPath from "../components/BookPath";
import { Book3D } from "../components/book/Book3D";
import { pageAtom, pages } from "../components/book/pages";

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

const BOOK_BREAKPOINT = 1000;
const BOOK_CAMERA_Z = 8;
const MOBILE_BOOK_SCALE = 1.4;
const DESKTOP_BOOK_SCALE = 2;
const BOOK_FLOATING_RANGE: [number, number] = [-0.004, 0.004];
const BOOK_FLOAT_INTENSITY = 0.18;
const BOOK_ROTATION_INTENSITY = 0.18;
const MOBILE_TOUCH_ACTION = "pan-y";
const DESKTOP_TOUCH_ACTION = "none";

const PageFlipAudio = () => {
  const [page] = useAtom(pageAtom);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play().catch(() => {});
  }, [page]);
  return null;
};

const Pagination = () => {
  const [page] = useAtom(pageAtom);
  const progress = (page / pages.length) * 100;
  return (
    <div className="relative flex w-full items-center gap-6 md:gap-8">
      <span className="font-serif text-2xl text-text tabular-nums">00.</span>
      <div className="relative h-px flex-1 bg-text/25">
        <span
          className="absolute top-1/2 h-2 w-2 rounded-full bg-text transition-[left] duration-500 ease-out"
          style={{
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <span className="font-serif text-2xl text-text tabular-nums">09.</span>
    </div>
  );
};

const Book = () => {
  const [isLargeViewport, setIsLargeViewport] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= BOOK_BREAKPOINT;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeViewport(window.innerWidth >= BOOK_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const bookScale = isLargeViewport ? DESKTOP_BOOK_SCALE : MOBILE_BOOK_SCALE;
  const canvasTouchAction = isLargeViewport
    ? DESKTOP_TOUCH_ACTION
    : MOBILE_TOUCH_ACTION;

  return (
    <section ref={sectionRef} className="relative w-full bg-cream">
      <BookPath />
      <div className="mx-auto flex max-w-6xl flex-col px-6 pt-24 pb-12 md:px-12 md:pt-32 relative">
        <header className="relative z-10 max-w-xl -mb-[18vh] min-[600px]:max-w-110 min-[600px]:mx-auto min-[600px]:w-full min-[600px]:-mb-[14vh]">
          <div className="overflow-hidden mb-4">
            <motion.p
              custom={0}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-sans text-xs tracking-[0.28em] text-muted will-change-transform"
            >
              PROJETS
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              custom={0.1}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-serif text-42 leading-title text-text will-change-transform min-[600px]:leading-[90%] min-[600px]:text-6xl min-[600px]:mb-2"
            >
              Une sélection de projets <em className="italic">livrés</em>
              <span className="text-build-stone">.</span>
            </motion.h2>
          </div>
          <hr className="my-3 h-px w-36 border-none bg-linear-to-r from-border to-transparent" />
          <div className="overflow-hidden">
            <motion.p
              custom={0.2}
              initial="hidden"
              animate={isRevealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-sans text-base leading-relaxed text-text will-change-transform"
            >
              Chaque réalisation est pensée sur mesure, avec une attention
              particulière portée aux{" "}
              <strong className="font-bold">
                contraintes techniques, aux usages et aux délais.
              </strong>
            </motion.p>
          </div>
        </header>

        <div className="relative h-[80vh] min-h-125 w-full touch-pan-y md:h-[88vh] md:min-h-180">
          <PageFlipAudio />
          <Loader />
          <Canvas
            camera={{ position: [0, 0, BOOK_CAMERA_Z], fov: 45 }}
            style={{
              touchAction: canvasTouchAction,
              filter:
                "drop-shadow(0 2px 2px rgba(41,41,41,0.18)) drop-shadow(0 22px 28px rgba(41,41,41,0.22))",
            }}
          >
            <Suspense fallback={null}>
              <Float
                rotation-x={-Math.PI / 4}
                floatIntensity={BOOK_FLOAT_INTENSITY}
                floatingRange={BOOK_FLOATING_RANGE}
                speed={1}
                rotationIntensity={BOOK_ROTATION_INTENSITY}
              >
                <Book3D scale={bookScale} canTiltBook={!isLargeViewport} />
              </Float>

              {isLargeViewport ? (
                <OrbitControls enablePan={false} enableZoom={false} />
              ) : null}
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 -mt-[15vh] min-[600px]:max-w-110 min-[600px]:mx-auto min-[600px]:w-full min-[600px]:-mt-[11vh]">
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default Book;
