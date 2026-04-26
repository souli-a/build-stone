import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

const logos = [
  { src: "/logos/ratp-logo.avif", alt: "RATP" },
  { src: "/logos/notaire-logo.svg", alt: "Notaires de France" },
  { src: "/logos/colliers-logo.avif", alt: "Colliers" },
];

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

const useRevealOnScroll = (rootMargin: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isRevealed };
};

const Contact = () => {
  const { ref: group1Ref, isRevealed: isGroup1Revealed } =
    useRevealOnScroll("0px 0px -30% 0px");
  const { ref: group2Ref, isRevealed: isGroup2Revealed } =
    useRevealOnScroll("0px 0px -10% 0px");

  return (
    <>
      <section className="bg-cream p-6 text-text flex flex-col gap-10 relative min-[600px]:max-w-110 min-[600px]:mx-auto min-[600px]:w-full">
        <div ref={group1Ref} className="flex flex-col gap-4">
          <div className="overflow-hidden">
            <motion.h1
              custom={0}
              initial="hidden"
              animate={isGroup1Revealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-serif text-42 leading-none tracking-tight will-change-transform"
            >
              Collaborons <em>ensemble</em>
              <span className="text-build-stone">.</span>
            </motion.h1>
          </div>
          <div>
            <div className="overflow-hidden">
              <motion.span
                custom={0.1}
                initial="hidden"
                animate={isGroup1Revealed ? "visible" : "hidden"}
                variants={textRevealVariants}
                className="block text-muted text-base will-change-transform"
              >
                Email
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.p
                custom={0.15}
                initial="hidden"
                animate={isGroup1Revealed ? "visible" : "hidden"}
                variants={textRevealVariants}
                className="font-medium text-lg will-change-transform"
              >
                buildstone75@gmail.com
              </motion.p>
            </div>
          </div>
          <div>
            <div className="overflow-hidden">
              <motion.span
                custom={0.2}
                initial="hidden"
                animate={isGroup1Revealed ? "visible" : "hidden"}
                variants={textRevealVariants}
                className="block text-muted text-base will-change-transform"
              >
                Téléphone
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.p
                custom={0.25}
                initial="hidden"
                animate={isGroup1Revealed ? "visible" : "hidden"}
                variants={textRevealVariants}
                className="font-medium text-lg will-change-transform"
              >
                +33 6 50 86 22 21
              </motion.p>
            </div>
          </div>
          <div className="overflow-hidden">
            <motion.p
              custom={0.3}
              initial="hidden"
              animate={isGroup1Revealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="text-base text-muted will-change-transform"
            >
              Études de projet et devis disponibles sur demande.
            </motion.p>
          </div>
        </div>
        <div ref={group2Ref} className="flex flex-col gap-6">
          <div className="overflow-hidden">
            <motion.h1
              custom={0}
              initial="hidden"
              animate={isGroup2Revealed ? "visible" : "hidden"}
              variants={textRevealVariants}
              className="font-serif text-42 leading-none tracking-tight will-change-transform"
            >
              Ils nous font <em>confiance</em>
              <span className="text-build-stone">.</span>
            </motion.h1>
          </div>
          <div className="flex h-[3.6rem] gap-5">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto"
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
