import { ArrowDown, Heart } from 'lucide-react';
import { useRef } from 'react';
import CascadeRevealElement from '../components/CascadeRevealElement';
import Header from '../components/Header';
import CtaButton from '../components/ui/CtaButton';
import Heading1 from '../components/ui/Heading1';
import Heading6 from '../components/ui/Heading6';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBody from '../components/ui/TextBody';
import useMagneticEffect from '../hooks/useMagneticEffect';
import aboutUsPageRef from '../utils/aboutUsPageRef';
import smoothScrollTo from '../utils/smoothScrollTo';

const Home = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useMagneticEffect(buttonRef);

  return (
    <div className="flex flex-col min-h-dvh p-5 pb-0">
      <Header />
      <div className="flex justify-center items-center flex-col flex-1 gap-50 max-md:gap-25">
        <CascadeRevealElement className="flex flex-col max-w-200 gap-6 items-center max-md:gap-3">
          <div className="flex gap-2 items-center justify-center flex-wrap">
            <Heart
              className="mb-[0.1rem] w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
              color="var(--color-pink)"
              strokeWidth={4}
            />
            <Heading6 className="text-center">150+ clients satisfaits</Heading6>
          </div>
          <Heading1 className="text-balance text-center">
            Une rénovation intérieure <br />
            de <PrimaryColorSpan>qualité</PrimaryColorSpan> pour des résultats{' '}
            <PrimaryColorSpan>durables</PrimaryColorSpan>
          </Heading1>
          <TextBody className="text-balance text-center">
            <span className="hidden md:inline">
              Une équipe expérimentée — Tous corps d'état — Depuis 2001
            </span>
            <span className="md:hidden">
              Une équipe expérimentée, tous corps d'état, depuis 2001
            </span>
          </TextBody>
          <CtaButton ref={buttonRef} className="uppercase">
            Contactez-nous
          </CtaButton>
        </CascadeRevealElement>
        <CascadeRevealElement>
          <button
            aria-label="Aller à la section à propos"
            className="cursor-pointer p-2 group animate-bouncing transition-all ease-in-out duration-300 hover:[animation-play-state:paused] hover:bg-dark rounded-full dark:hover:bg-light"
            onClick={() =>
              smoothScrollTo(aboutUsPageRef as React.RefObject<HTMLElement>)
            }>
            <ArrowDown
              strokeWidth={4}
              className="group-hover:stroke-light transition-all ease-in-out duration-300 dark:group-hover:stroke-dark w-[45px] h-[45px] md:w-[70px] md:h-[70px]"
            />
          </button>
        </CascadeRevealElement>
      </div>
    </div>
  );
};

export default Home;
