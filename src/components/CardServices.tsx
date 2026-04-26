import { motion } from "motion/react";
import type { KeyboardEvent, MouseEvent } from "react";

export type ServiceCard = {
  id: number;
  numero: string;
  label: string;
  titre: string;
  romain: string;
  items: string[];
};

type CardServicesProps = {
  accent: string;
  card: ServiceCard;
  isActive: boolean;
  isAnyActive: boolean;
  isRevealed: boolean;
  left: string;
  onToggle: (id: number) => void;
  revealDelay: number;
  revealOffset: { x: number; y: number };
  rotate: number;
  top: string;
  zIndex: number;
};

const springTransition = {
  type: "spring" as const,
  stiffness: 240,
  damping: 22,
  mass: 0.9,
};

const CardServices = ({
  accent,
  card,
  isActive,
  isAnyActive,
  isRevealed,
  left,
  onToggle,
  revealDelay,
  revealOffset,
  rotate,
  top,
  zIndex,
}: CardServicesProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isActive && event.detail > 1) {
      return;
    }

    onToggle(card.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(card.id);
    }
  };

  return (
    <motion.div
      className="absolute h-61.5 w-51.5"
      style={{ left, top, zIndex }}
      initial={{ opacity: 0, x: revealOffset.x, y: revealOffset.y }}
      animate={{
        opacity: isRevealed ? 1 : 0,
        x: isRevealed ? 0 : revealOffset.x,
        y: isRevealed ? 0 : revealOffset.y,
      }}
      transition={{
        duration: 0.65,
        delay: isRevealed ? revealDelay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        initial={false}
        animate={{
          rotate: isActive ? 0 : rotate,
          scale: isActive ? 1.05 : 1,
          y: isActive ? -20 : 0,
          boxShadow: isActive
            ? "0 32px 60px rgba(44,30,18,0.24)"
            : "0 22px 44px rgba(44,30,18,0.18)",
        }}
        whileHover={
          !isAnyActive
            ? {
                y: -10,
                transition: { type: "spring", stiffness: 320, damping: 20 },
              }
            : undefined
        }
        transition={springTransition}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-cream text-left ring-1 ring-black/10"
      >
        <div
          className="flex items-center px-4 py-3"
          style={{ backgroundColor: accent }}
        >
          <p className="font-sans text-[0.5rem] font-medium uppercase tracking-[0.20em] text-text">
            {card.numero} — {card.label}
          </p>
        </div>

        <div className="relative flex flex-1 flex-col px-4 pb-4 pt-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 font-serif text-[3rem] leading-none"
            style={{ color: accent, opacity: 0.22 }}
          >
            {card.romain}
          </span>

          <div className="relative">
            <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.03em] text-text">
              {card.titre}
            </h3>

            <ul className="mt-4 space-y-1 font-sans text-[0.8rem] leading-[1.22] tracking-[-0.03em] text-text">
              {card.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>

          <div
            className={`pointer-events-none flex items-center justify-between pt-2 ${
              card.id === 1 ? "-translate-y-10 translate-x-2" : ""
            }`}
          >
            <div
              className={`${card.id !== 1 ? "w-20 h-px border-none bg-linear-to-r from-border to-transparent" : ""}`}
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c86439] shadow-[0_12px_24px_rgba(84,43,20,0.18)]">
              <img
                src="/images/stamp.png"
                alt=""
                aria-hidden="true"
                className="h-[88%] w-[88%]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardServices;
