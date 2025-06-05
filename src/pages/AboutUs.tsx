import CascadeRevealElement from '../components/CascadeRevealElement';
import Heading1 from '../components/ui/Heading1';
import Heading6 from '../components/ui/Heading6';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBody from '../components/ui/TextBody';
import aboutUsPageRef from '../utils/aboutUsPageRef';

const AboutUs = () => {
  return (
    <div
      className="flex justify-center p-5 pb-10 max-md:pb-5"
      ref={aboutUsPageRef}>
      <article className="w-container text-balance">
        <CascadeRevealElement className="flex flex-col gap-5 max-md:gap-2">
          <Heading1>
            <PrimaryColorSpan>Build Stone</PrimaryColorSpan>
          </Heading1>
          <Heading6>Qui sommes-nous ?</Heading6>
          <TextBody>
            Qu'il s'agisse de rénover entièrement une pièce, de réaliser une
            pose ou une dépose de sol, ou de tout autres rénovations extérieurs,
            <PrimaryColorSpan>
              {' '}
              nous avons le savoir-faire
            </PrimaryColorSpan>{' '}
            pour prendre en charge votre chantier.
          </TextBody>
          <TextBody>
            Chez <PrimaryColorSpan>Build Stone</PrimaryColorSpan>, nous croyons
            en des résultats qui non seulement{' '}
            <PrimaryColorSpan>répondent à vos attentes</PrimaryColorSpan>, mais
            les dépassent.
          </TextBody>
          <TextBody>
            Il nous tient à cœur de fournir la plus haute{' '}
            <PrimaryColorSpan>qualité de service</PrimaryColorSpan>. C'est ce
            qui a permis de satisfaire plus de{' '}
            <PrimaryColorSpan>150 clients</PrimaryColorSpan> à travers la
            France.
          </TextBody>
          <TextBody>
            <PrimaryColorSpan>
              Nous respectons scrupuleusement les délais
            </PrimaryColorSpan>
            , les normes de sécurité et{' '}
            <PrimaryColorSpan>les budgets</PrimaryColorSpan> tout en
            garantissant d'excellentes finitions et{' '}
            <PrimaryColorSpan>des résultats durables</PrimaryColorSpan>, grâce à
            des matériaux soigneusement sélectionnés.
          </TextBody>
          <TextBody>
            De la discussion à la réalisation, notre équipe qualifiée assure une
            gestion de projet avec un{' '}
            <PrimaryColorSpan>suivi rigoureux et transparent</PrimaryColorSpan>{' '}
            et transparent à chaque étape.
          </TextBody>
          <TextBody>
            <PrimaryColorSpan>Nous offrons nos solutions</PrimaryColorSpan> dans
            toutes les régions de France, portées
            <PrimaryColorSpan> par une équipe expérimentée </PrimaryColorSpan>
            dans la rénovation d'intérieur{' '}
            <PrimaryColorSpan>depuis plus de 20 ans</PrimaryColorSpan>.
          </TextBody>
        </CascadeRevealElement>
      </article>
    </div>
  );
};

export default AboutUs;
