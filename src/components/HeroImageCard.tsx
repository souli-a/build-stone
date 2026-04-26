import { motion } from "motion/react";

type HeroImageCardProps = {
  isRevealed: boolean;
};

const HeroImageCard = ({ isRevealed }: HeroImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0 }}
      transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[50vh]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 28%, black 72%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 28%, black 72%, transparent)",
      }}
    >
      <img
        src="/images/homepage-image.jpg"
        alt="Couloir en pierre"
        className="block h-full w-full object-cover"
      />
    </motion.div>
  );
};

export default HeroImageCard;
