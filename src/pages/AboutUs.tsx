import Heading1 from '../components/ui/Heading1';
import Heading6 from '../components/ui/Heading6';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';
import aboutUsPageRef from '../utils/aboutUsPageRef';

const AboutUs = () => {
  return (
    <div
      className="flex justify-center p-5 pb-10 max-md:pb-5"
      ref={aboutUsPageRef}>
      <article className="w-container text-balance">
        <div className="flex flex-col gap-5 max-md:gap-2">
          <Heading1>
            <PrimaryColorSpan>Build Stone</PrimaryColorSpan>
          </Heading1>
          <Heading6>Qui sommes-nous ?</Heading6>
          <TextBodyDesktop>
            Qu'il s'agisse de rénover entièrement une pièce, de réaliser une
            pose ou une dépose de sol, ou de tout autres rénovations extérieurs,
            <PrimaryColorSpan>
              {' '}
              nous avons le savoir-faire
            </PrimaryColorSpan>{' '}
            pour prendre en charge votre chantier.
          </TextBodyDesktop>
          <TextBodyDesktop>
            Chez <PrimaryColorSpan>Build Stone</PrimaryColorSpan>, nous croyons
            en des résultats qui non seulement{' '}
            <PrimaryColorSpan>répondent à vos attentes</PrimaryColorSpan>, mais
            les dépassent.
          </TextBodyDesktop>
          <TextBodyDesktop>
            Il nous tient à cœur de fournir la plus haute{' '}
            <PrimaryColorSpan>qualité de service</PrimaryColorSpan>. C'est ce
            qui a permis de satisfaire plus de{' '}
            <PrimaryColorSpan>150 clients</PrimaryColorSpan> à travers la
            France.
          </TextBodyDesktop>
          <TextBodyDesktop>
            <PrimaryColorSpan>
              Nous respectons scrupuleusement les délais
            </PrimaryColorSpan>
            , les normes de sécurité et{' '}
            <PrimaryColorSpan>les budgets</PrimaryColorSpan> tout en
            garantissant d'excellentes finitions et{' '}
            <PrimaryColorSpan>des résultats durables</PrimaryColorSpan>, grâce à
            des matériaux soigneusement sélectionnés.
          </TextBodyDesktop>
          <TextBodyDesktop>
            De la discussion à la réalisation, notre équipe qualifiée assure une
            gestion de projet avec un{' '}
            <PrimaryColorSpan>suivi rigoureux et transparent</PrimaryColorSpan>{' '}
            et transparent à chaque étape.
          </TextBodyDesktop>
          <TextBodyDesktop>
            <PrimaryColorSpan>Nous offrons nos solutions</PrimaryColorSpan> dans
            toutes les régions de France, portées
            <PrimaryColorSpan> par une équipe expérimentée </PrimaryColorSpan>
            dans la rénovation d'intérieur{' '}
            <PrimaryColorSpan>depuis plus de 20 ans</PrimaryColorSpan>.
          </TextBodyDesktop>
        </div>
      </article>
    </div>
  );
};

export default AboutUs;
