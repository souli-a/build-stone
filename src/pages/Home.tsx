import { Heart } from 'lucide-react';
import Header from '../components/Header';
import ButtonCTA from '../components/ui/ButtonCTA';
import Heading1 from '../components/ui/Heading1';
import Heading6 from '../components/ui/Heading6';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const Home = () => {
  return (
    <div className="flex flex-col text-dark bg-light h-full w-full">
      <title>Build Stone</title>
      <Header />
      <div className="w-full h-full flex justify-center items-center">
        <section className="h-fit max-w-[60rem] flex flex-col gap-[var(--spacing-4xl)] items-center">
          <div className="flex gap-[var(--spacing-md)] items-center w-fit">
            <Heart color="var(--color-pink)" size={20} strokeWidth={4} />
            <Heading6>150+ clients satisfaits</Heading6>
          </div>
          <Heading1 className="text-balance text-center mb-[-0.5rem] mt-[-0.5rem]">
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
      </div>
    </div>
  );
};

export default Home;
