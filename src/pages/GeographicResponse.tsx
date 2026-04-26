import { motion } from "motion/react";

const reveal = {
  hidden: { y: "130%" },
  visible: {
    y: "0%",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const viewport = { once: true, margin: "0px 0px -20% 0px" };

const GeographicResponse = () => (
  <section className="bg-cream p-6 text-text relative mx-auto min-[600px]:max-w-110">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="overflow-hidden"
    >
      <motion.h1
        variants={reveal}
        className="font-serif text-42 leading-none tracking-tight will-change-transform"
      >
        Notre périmètre d'intervention{" "}
        <span className="text-build-stone">.</span>
      </motion.h1>
    </motion.div>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mt-6 overflow-hidden"
    >
      <motion.p
        variants={reveal}
        className="font-sans text-xl leading-8 will-change-transform"
      >
        <em>
          <b>Build Stone</b>
        </em>{" "}
        intervient sur l'ensemble de <b>Paris</b> et de l'Île-de-France auprès
        de : bureaux et espaces de travail, <b>cabinets professionnels</b>,
        commerces et boutiques, immeubles tertiaires, copropriétés et syndics
        d'immeubles, hôtellerie et restauration, résidentiel, ainsi que des{" "}
        <b>espaces occupés</b>.
      </motion.p>
    </motion.div>
  </section>
);

export default GeographicResponse;
