import { useEffect, useState } from "react";
import CardServices, { type ServiceCard } from "./CardServices";

const STACK_WIDTH_REM = 25;
const STACK_HEIGHT_REM = 27.5;
const CARD_WIDTH_REM = 12.875;
const STACK_SIDE_GUTTER_PX = 24;

const cards: ServiceCard[] = [
  {
    id: 1,
    numero: "01",
    label: "SECOND ŒUVRE.",
    titre: "Cloisons & Finitions.",
    romain: "I.",
    items: [
      "Plâtrerie & enduits.",
      "Peinture intérieure.",
      "Revêtements de sol.",
      "Doublage thermique.",
      "Petite maçonnerie.",
    ],
  },
  {
    id: 2,
    numero: "02",
    label: "AMÉNAGEMENT.",
    titre: "Intérieur & Bureaux.",
    romain: "II.",
    items: [
      "Menuiserie intérieure.",
      "Aménagement des bureaux.",
      "Rénovation clé en main.",
    ],
  },
  {
    id: 3,
    numero: "03",
    label: "COORDINATION.",
    titre: "Pilotage de chantier.",
    romain: "III.",
    items: [
      "Organisation des travaux.",
      "Suivi du planning.",
      "Coordination intervenants.",
    ],
  },
];

const cardLayouts = [
  {
    accent: "#EDB076",
    leftPercent: 12,
    rotate: -5.5,
    top: "2%",
    revealOffset: { x: -40, y: -60 },
    revealDelay: 0,
  },
  {
    accent: "#B8967A",
    leftPercent: 31,
    rotate: 4.25,
    top: "19%",
    revealOffset: { x: 50, y: -40 },
    revealDelay: 0.07,
  },
  {
    accent: "#C4854A",
    leftPercent: 2,
    rotate: -2.75,
    top: "44%",
    revealOffset: { x: -30, y: 60 },
    revealDelay: 0.14,
  },
];

const stackBounds = cardLayouts.reduce(
  (bounds, layout) => {
    const left = (layout.leftPercent / 100) * STACK_WIDTH_REM;

    return {
      min: Math.min(bounds.min, left),
      max: Math.max(bounds.max, left + CARD_WIDTH_REM),
    };
  },
  {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  },
);

const stackOffsetRem =
  STACK_WIDTH_REM / 2 - (stackBounds.min + stackBounds.max) / 2;

type CardStackProps = {
  isRevealed: boolean;
};

const CardStack = ({ isRevealed }: CardStackProps) => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [stackScale, setStackScale] = useState(1);

  useEffect(() => {
    const updateStackScale = () => {
      const availableWidth = window.innerWidth - STACK_SIDE_GUTTER_PX;
      const baseWidth = STACK_WIDTH_REM * 16;
      setStackScale(Math.min(1, availableWidth / baseWidth));
    };

    updateStackScale();
    window.addEventListener("resize", updateStackScale);

    return () => {
      window.removeEventListener("resize", updateStackScale);
    };
  }, []);

  const handleToggle = (id: number) => {
    setActiveCardId((currentId) => (currentId === id ? null : id));
  };

  return (
    <div
      className="relative mx-auto w-full max-w-100 **:select-none"
      style={{ height: `${STACK_HEIGHT_REM * stackScale}rem` }}
    >
      <div
        className="absolute left-1/2 top-0 h-110 w-100 origin-top"
        style={{ transform: `translateX(-50%) scale(${stackScale})` }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: `translateX(${stackOffsetRem}rem)` }}
        >
          {cards.map((card, index) => {
            const layout = cardLayouts[index];
            const isActive = activeCardId === card.id;

            return (
              <CardServices
                key={card.id}
                accent={layout.accent}
                card={card}
                isActive={isActive}
                isAnyActive={activeCardId !== null}
                isRevealed={isRevealed}
                left={`${layout.leftPercent}%`}
                onToggle={handleToggle}
                revealDelay={layout.revealDelay}
                revealOffset={layout.revealOffset}
                rotate={layout.rotate}
                top={layout.top}
                zIndex={isActive ? 40 : index + 10}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
