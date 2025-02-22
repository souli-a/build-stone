import { Heart } from 'lucide-react';
import ButtonCTA from '../components/ButtonCTA';
import Header from '../components/Header';
import PrimaryColorSpan from '../components/PrimaryColorSpan';
import Heading1 from './../components/Heading1';
import Heading6 from './../components/Heading6';

const Home = () => {
  return (
    <div className="flex flex-col text-dark bg-light h-full w-full">
      <title>Build Stone</title>
      <Header />
      <div className="w-full h-full flex justify-center items-center">
        <section className="h-fit max-w-[60rem] flex flex-col gap-[var(--spacing-xl)] items-center">
          <div className="flex gap-[var(--spacing-md)] items-center w-fit">
            <Heart color="var(--color-pink)" size={20} strokeWidth={4} />
            <Heading6>
              150+ clients <PrimaryColorSpan>satisfaits</PrimaryColorSpan>
            </Heading6>
          </div>
          <div>
            <Heading1 className="text-balance text-center">
              Une rénovation intérieure <br />
              de <PrimaryColorSpan>qualité</PrimaryColorSpan> pour des résultats{' '}
              <PrimaryColorSpan>durables</PrimaryColorSpan>
            </Heading1>
          </div>
          <ButtonCTA className="mt-2 magnetic-element">
            OBTENEZ UN DEVIS GRATUIT — DÈS MAINTENANT
          </ButtonCTA>
        </section>
      </div>
    </div>
  );
};

export default Home;
