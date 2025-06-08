import { Info } from 'lucide-react';
import { useState } from 'react';
import { EMAIL } from '../../constants/contact';
import ContactInfo from '../ContactInfo';
import TextBody from './TextBody';

const EMAIL_SUBJECT = 'Demande de devis – [Nom de votre projet / entreprise]';
const EMAIL_BODY = `Bonjour,

Je vous contacte afin d'obtenir un devis pour [préciser le service ou le projet].

Pourriez-vous m'indiquer vos disponibilités pour en discuter ?

Cordialement,
[Votre nom / entreprise / coordonnées]`;

const CtaButton = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const [showFallback, setShowFallback] = useState(false);

  const handleEmailRedirection = () => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      EMAIL_SUBJECT
    )}&body=${encodeURIComponent(EMAIL_BODY)}`;

    setTimeout(() => {
      setShowFallback(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <button
        aria-label="Demander un devis"
        onClick={handleEmailRedirection}
        className={`cursor-pointer font-title-desktop text-title-desktop-6 text-light bg-primary rounded-xl px-10 py-7 max-md:text-title-mobile-6 max-md:font-title-mobile max-md:w-fit max-md:px-7 max-md:py-5 ${
          className || ''
        }`}>
        {children}
      </button>
      {showFallback && (
        <div className="flex flex-col items-center gap-4 rounded-xl px-10 py-7 max-md:w-fit max-md:px-7 max-md:py-5 max-md:gap-3 bg-grey-light-mode dark:bg-amber-950">
          <div className="flex items-center gap-2 max-md:flex-col max-md:gap-1 max-sm:gap-2">
            <Info color="var(--color-primary)" size={24} strokeWidth={3} />
            <TextBody className="text-center text-balance font-bold max-md:font-bold">
              Votre mail ne s'est pas ouvert ?
            </TextBody>
          </div>
          <div className="flex flex-col items-center max-md:gap-1">
            <TextBody className="text-center text-balance">
              Cliquez pour copier notre mail / numéro :
            </TextBody>
            <ContactInfo className="justify-center items-center max-lg:flex-col max-lg:gap-0 max-md:gap-0 max-sm:gap-0" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CtaButton;
