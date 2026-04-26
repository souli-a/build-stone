import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const textRevealVariants = {
  hidden: { y: "130%", opacity: 1 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const logos = [
  { src: "/logos/notaire-logo.svg", alt: "Notaires de France" },
  { src: "/logos/cb-21-logo.avif", alt: "CB 21" },
  { src: "/logos/colliers-logo.avif", alt: "Colliers" },
  { src: "/logos/engie-logo.avif", alt: "Engie" },
  { src: "/logos/paris-diderot-logo.avif", alt: "Université Paris Diderot" },
  { src: "/logos/ratp-logo.avif", alt: "RATP" },
  { src: "/logos/tour-eiffel-logo.avif", alt: "Tour Eiffel" },
];

const track = [...logos, ...logos];

const Experiences = () => {
  const h1Ref = useRef<HTMLDivElement>(null);
  const [isH1Revealed, setIsH1Revealed] = useState(false);

  useEffect(() => {
    const el = h1Ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsH1Revealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10">
      <section className="bg-cream p-6 text-text mx-auto min-[600px]:max-w-110">
        <div ref={h1Ref} className="overflow-hidden">
          <motion.h1
            initial="hidden"
            animate={isH1Revealed ? "visible" : "hidden"}
            variants={textRevealVariants}
            className="font-serif text-42 leading-none tracking-tight will-change-transform"
          >
            Notre expérience <span className="text-build-stone">.</span>
          </motion.h1>
        </div>
        <div className="mt-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-xl leading-8"
          >
            Les équipes{" "}
            <em>
              <b>Build Stone</b>
            </em>{" "}
            disposent d'une solide expérience dans le secteur du BTP, forgée
            notamment sur des projets majeurs tels que la <b>Tour Eiffel</b>, la
            Tour <b>CB21</b> ou encore des chantiers <b>RATP</b>, ce qui leur a
            permis de développer une exigence élevée en matière de qualité, une
            parfaite maîtrise des contraintes techniques, une grande rigueur en
            matière de sécurité, une capacité d'intervention en environnement
            complexe ainsi qu'une <b>organisation efficace</b> des équipes sur
            des délais courts.
          </motion.p>
        </div>
      </section>

      <section className="overflow-hidden bg-cream py-12 mx-auto min-[600px]:max-w-230">
        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-15 animate-[logo-scroll_30s_linear_infinite]">
            {track.map((logo, index) => (
              <div
                key={index}
                className="flex h-[3.6rem] shrink-0 items-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="block h-full w-auto grayscale opacity-40"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center font-sans text-xs tracking-[0.2em] text-muted uppercase">
          Ils nous font confiance
        </p>
      </section>
    </div>
  );
};

export default Experiences;
