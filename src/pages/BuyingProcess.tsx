import Heading1 from '../components/ui/Heading1';
import ProcessStepContent from '../components/ui/ProcessStepContent';

const BuyingProcess = () => {
  return (
    <div className="flex flex-col gap-[6rem] p-[10rem] pt-[7.5rem] pb-[7.5rem] max-w-[250rem]">
      <Heading1>Notre processus</Heading1>
      <div className="flex justify-between *:w-[30%]">
        <ProcessStepContent stepNumber={'01.'} title="Contact">
          Lors de notre premier échange (par téléphone, WhatsApp ou email),
          partagez-nous vos idées. Nous conviendrons ensuite d'un rendez-vous,
          selon vos convenances, pour discuter en détail de vos besoins,
          répondre à vos questions, et planifier les prochaines étapes ensemble.
        </ProcessStepContent>
        <ProcessStepContent stepNumber={'02.'} title="Discussion">
          Après notre échange, nous vous remettons un devis clair et détaillé,
          comprenant un descriptif précis des travaux, les matériaux utilisés et
          un planning prévisionnel. Nous prendrons le temps de le parcourir avec
          vous pour l'ajuster selon vos attentes.
        </ProcessStepContent>
        <ProcessStepContent stepNumber={'03.'} title="Réalisation">
          Une fois le devis validé, nous planifierons le démarrage des travaux.
          Tout au long du chantier, nous vous tiendrons informé de l'avancée des
          travaux et serons à l'écoute de vos remarques. Notre objectif est de
          vous garantir une rénovation de qualité, dans les délais impartis.
          Nous effectuons une vérification finale avec vous pour nous assurer
          que tout correspond à vos attentes. Votre satisfaction est notre
          priorité.
        </ProcessStepContent>
      </div>
      <ProcessStepContent
        stepNumber={'04.'}
        title={
          <>
            Votre rénovation a bien été{' '}
            <span className="text-[var(--color-green)]">effectuée</span>.
          </>
        }
      />
    </div>
  );
};

export default BuyingProcess;
