import CascadeRevealElement from '../components/CascadeRevealElement';
import Heading1 from '../components/ui/Heading1';
import ProcessStepContent from '../components/ui/ProcessStepContent';

const ProcessSteps = () => {
  return (
    <div className="flex justify-center p-5 pb-10 max-md:pb-5">
      <CascadeRevealElement
        threshold={0.2}
        className="flex flex-col w-container gap-10 max-md:gap-5">
        <Heading1>Notre processus</Heading1>
        <CascadeRevealElement
          threshold={0.3}
          staggerDelay={250}
          className="flex flex-col gap-10 max-md:gap-5">
          <ProcessStepContent stepNumber={'01.'} title="Contact">
            Lors de notre premier échange (téléphone, WhatsApp ou email),
            partagez-nous vos idées. Nous conviendrons ensuite d'un rendez-vous,
            selon vos convenances, pour discuter en détail de vos besoins,
            répondre à vos questions, et planifier les prochaines étapes
            ensemble.
          </ProcessStepContent>
          <ProcessStepContent stepNumber={'02.'} title="Discussion">
            Après notre échange, nous vous remettons un devis clair et détaillé,
            comprenant un descriptif précis des travaux, les matériaux utilisés
            et un planning prévisionnel. Nous prendrons le temps de le parcourir
            avec vous pour l'ajuster selon vos attentes.
          </ProcessStepContent>
          <ProcessStepContent stepNumber={'03.'} title="Réalisation">
            Une fois le devis validé, nous planifierons le démarrage des
            travaux. Tout au long du chantier, nous vous tiendrons informé de
            l'avancée des travaux et serons à l'écoute de vos remarques. Notre
            objectif est de vous garantir une rénovation de qualité, dans les
            délais impartis. Nous effectuons une vérification finale avec vous
            pour nous assurer que tout correspond à vos attentes. Votre
            satisfaction est notre priorité.
          </ProcessStepContent>
          <ProcessStepContent
            stepNumber={'04.'}
            title={
              <>
                Votre rénovation a bien été{' '}
                <span className="text-green">effectuée</span>.
              </>
            }
          />
        </CascadeRevealElement>
      </CascadeRevealElement>
    </div>
  );
};

export default ProcessSteps;
