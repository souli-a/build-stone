import { ArrowDown, Heart } from 'lucide-react';
import Header from '../components/Header';
import ButtonCTA from '../components/ui/ButtonCTA';
import Heading1 from '../components/ui/Heading1';
import Heading6 from '../components/ui/Heading6';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const Home = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <title>Build Stone</title>
      <Header />
      <div className="flex justify-center items-center flex-1 flex-col">
        <section className="h-fit max-w-[60rem] flex flex-col gap-[var(--spacing-3xl)] items-center">
          <div className="flex gap-[var(--spacing-md)] items-center">
            <Heart color="var(--color-pink)" size={20} strokeWidth={4} />
            <Heading6>150+ clients satisfaits</Heading6>
          </div>
          <Heading1 className="text-balance text-center mb-[-0.5rem] mt-[-0.7rem]">
            Une rénovation intérieure <br />
            de <PrimaryColorSpan>qualité</PrimaryColorSpan> pour des résultats{' '}
            <PrimaryColorSpan>durables</PrimaryColorSpan>
          </Heading1>
          <TextBodyDesktop className="text-balance text-center opacity-85">
            Une équipe expérimentée — Tous corps d'état — Depuis 2001
          </TextBodyDesktop>
          <ButtonCTA className="magnetic-element uppercase">
            OBTENEZ UN DEVIS GRATUIT — DÈS MAINTENANT
          </ButtonCTA>
        </section>
        <div className="cursor-pointer group animate-bouncing hover:[animation-play-state:paused] absolute mt-180 hover:bg-dark transition-all ease-in-out duration-300 rounded-full p-5">
          <ArrowDown
            size={70}
            strokeWidth={4}
            className="group-hover:stroke-light transition-all ease-in-out duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
