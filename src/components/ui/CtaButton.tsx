import { EMAIL } from '../../constants/contact';

const CtaButton = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const handleEmailRedirection = () => {
    window.location.href = `mailto:${EMAIL}?subject=Demande%20de%20devis%20%E2%80%93%20%5BNom%20de%20votre%20projet%20%2F%20entreprise%5D&body=Bonjour%2C%0D%0A%0D%0AJe%20vous%20contacte%20afin%20d%E2%80%99obtenir%20un%20devis%20pour%20%5Bpr%C3%A9ciser%20le%20service%20ou%20le%20projet%5D.%0D%0A%0D%0APourriez-vous%20m'indiquer%20vos%20disponibilit%C3%A9s%20pour%20en%20discuter%20%3F%0D%0A%0D%0ACordialement%2C%0D%0A%5BVotre%20nom%20%2F%20entreprise%20%2F%20coordonn%C3%A9es%5D`;
  };

  return (
    <button
      name="Demander un devis"
      onClick={handleEmailRedirection}
      className={`cursor-pointer font-title-desktop text-title-desktop-6 text-light bg-primary rounded-xl px-10 py-7 max-md:text-title-mobile-6 max-md:font-title-mobile max-md:w-fit max-md:px-7 max-md:py-5 ${
        className || ''
      }`}>
      {children}
    </button>
  );
};

export default CtaButton;
