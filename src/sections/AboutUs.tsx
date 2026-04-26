import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const TITLE_IN_END = 0.4;
const TITLE_OUT_END = 0.6;
const PHRASES_START = TITLE_OUT_END;
const PHRASES_END = 1.0;

const TITLE_MIN_OPACITY = 0.05;
const TITLE_FADE_AMOUNT = 1 - TITLE_MIN_OPACITY;

const SCROLL_RANGE_VH = 4;

const PHRASES = [
  <>
    Build Stone est née de la rencontre de professionnels du BTP partageant une
    même exigence : la maîtrise du savoir-faire et la{" "}
    <b>qualité d&apos;exécution</b>.
  </>,
  <>
    Nous rassemblons des expertises complémentaires portées par des{" "}
    <b>collaborateurs qualifiés</b>, forgés sur des projets d&apos;envergure et
    des chantiers à forte technicité.
  </>,
  <>
    Notre force repose sur cette complémentarité de compétences,
    l&apos;expérience terrain ainsi qu&apos;une <b>organisation rigoureuse</b>.
  </>,
  <>
    Le tout au service de la <b>réussite</b> de chaque projet.
  </>,
];

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const phrasesRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useRef(0);
  const isBandVisible = useRef(false);
  const isBandPinned = useRef(true);

  useEffect(() => {
    viewportHeight.current = window.innerHeight;
    const handleResize = () => {
      viewportHeight.current = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLenis((lenis) => {
    const band = bandRef.current;
    const title = titleRef.current;
    const section = sectionRef.current;
    const phrases = phrasesRef.current;
    if (!band || !title || !section || !phrases || !viewportHeight.current)
      return;

    const sectionTop = section.offsetTop;
    const scrollInSection = lenis.scroll - sectionTop;

    const progress = Math.max(
      0,
      Math.min(1, scrollInSection / (SCROLL_RANGE_VH * viewportHeight.current)),
    );

    if (progress <= 0) {
      if (isBandVisible.current) {
        band.style.display = "none";
        isBandVisible.current = false;
      }
      if (!isBandPinned.current) {
        band.style.position = "";
        band.style.inset = "";
        band.style.height = "";
        isBandPinned.current = true;
      }
      return;
    }

    if (!isBandVisible.current) {
      band.style.display = "flex";
      isBandVisible.current = true;
    }

    const maxScroll = section.offsetHeight - viewportHeight.current;
    const shouldUnpin = scrollInSection >= maxScroll - 1;

    if (shouldUnpin && isBandPinned.current) {
      band.style.position = "absolute";
      band.style.inset = "auto 0 0 0";
      band.style.height = "100vh";
      isBandPinned.current = false;
    } else if (!shouldUnpin && !isBandPinned.current) {
      band.style.position = "";
      band.style.inset = "";
      band.style.height = "";
      isBandPinned.current = true;
    }

    const phase1 = Math.min(1, progress / TITLE_IN_END);
    band.style.clipPath = `inset(${(1 - phase1) * 50}% 0)`;
    title.style.transform = `scale(${0.5 + phase1 * 0.5})`;

    let titleOpacity: number;
    if (progress <= TITLE_IN_END) {
      titleOpacity = phase1;
    } else {
      titleOpacity =
        1 -
        Math.min(
          1,
          (progress - TITLE_IN_END) / (TITLE_OUT_END - TITLE_IN_END),
        ) *
          TITLE_FADE_AMOUNT;
    }
    title.style.opacity = String(titleOpacity);

    const phraseProgress = Math.max(
      0,
      Math.min(1, (progress - PHRASES_START) / (PHRASES_END - PHRASES_START)),
    );

    const children = phrases.children;
    const count = children.length;
    const slot = 1 / count;
    const ENTER_OFFSET_PX = 50;
    const EXIT_OFFSET_PX = 120;
    const ENTER_FRACTION = 0.4;
    const HOLD_FRACTION = 0.3;
    const EXIT_FRACTION = 0.3;

    for (let i = 0; i < count; i++) {
      const enterStart = i * slot;
      const exitStart = enterStart + slot * (ENTER_FRACTION + HOLD_FRACTION);
      const enterT = Math.max(
        0,
        Math.min(1, (phraseProgress - enterStart) / (slot * ENTER_FRACTION)),
      );
      const isLast = i === count - 1;
      const exitT = isLast
        ? 0
        : Math.max(
            0,
            Math.min(1, (phraseProgress - exitStart) / (slot * EXIT_FRACTION)),
          );

      const y = (1 - enterT) * ENTER_OFFSET_PX - exitT * EXIT_OFFSET_PX;
      const opacity = enterT * (1 - exitT);

      const child = children[i] as HTMLElement;
      child.style.transform = `translateY(${y}px)`;
      child.style.opacity = String(opacity);
    }
  });

  return (
    <div ref={sectionRef} className="relative h-[500vh] text-border">
      <div
        ref={bandRef}
        className="fixed inset-0 z-50 overflow-hidden bg-bg-dark"
        style={{ clipPath: "inset(50% 0)", display: "none" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            ref={titleRef}
            className="font-sans uppercase leading-none text-center"
            style={{
              opacity: 0,
              transform: "scale(0.8)",
              fontSize: "clamp(6rem, 24vw, 12rem)",
            }}
          >
            Qui
            <br />
            sommes
            <br />
            <span className="text-build-stone">nous </span>?
          </h1>
        </div>

        <div ref={phrasesRef} className="absolute inset-0">
          {PHRASES.map((phrase, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center font-sans text-2xl leading-7 px-6 will-change-transform text-center"
              style={{
                opacity: 0,
                transform: "translateY(50px)",
              }}
            >
              <span className="max-w-2xl min-[600px]:max-w-80">{phrase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
