import { useEffect, useRef, useState } from "react";
import CardStack from "../components/CardStack";
import ServicesPath from "../components/ServicesPath";

const Services = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative z-10 flex min-h-screen items-center justify-center bg-cream text-text overflow-hidden"
    >
      <ServicesPath />
      <section className="flex w-full flex-col items-center justify-center text-center gap-10">
        <h1 className="font-serif text-42 tracking-tight">
          Nos services <span className="text-build-stone">.</span>
        </h1>
        <CardStack isRevealed={isRevealed} />
      </section>
    </main>
  );
};

export default Services;
