import ContactInfo from '../components/ContactInfo';
import Heading1 from '../components/ui/Heading1';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const Contact = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-[var(--spacing-3xl)] w-[60rem]">
        <Heading1>
          Ils nous font <PrimaryColorSpan>confiance</PrimaryColorSpan>
        </Heading1>
        <div className="flex items-center flex-wrap gap-5 *:flex-1 *:max-w-[10rem]">
          <img src="images/cb21-logo.png" alt="Tour CB21 logo" />
          <img src="images/engie-logo.png" alt="Engie logo" />
          <img src="images/paris-diderot-logo.png" alt="Paris Diderot logo" />
          <img src="images/ratp-logo.png" alt="RATP logo" />
          <img src="images/tour-eiffel-logo.png" alt="Tour Eiffel logo" />
        </div>
        <Heading1>
          Vous avez un <PrimaryColorSpan>projet</PrimaryColorSpan> ?
        </Heading1>
        <ContactInfo className="text-title-desktop-6" />
        <TextBodyDesktop>
          Nous répondons à toutes vos questions, tous les jours de 9h à 19h.
        </TextBodyDesktop>
      </div>
    </div>
  );
};

export default Contact;
