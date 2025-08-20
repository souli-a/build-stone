import CascadeRevealElement from '../components/CascadeRevealElement';
import ContactInfo from '../components/ContactInfo';
import Heading1 from '../components/ui/Heading1';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBody from '../components/ui/TextBody';

const Contact = () => {
  return (
    <div className="flex items-center justify-center p-5 pb-10">
      <CascadeRevealElement className="flex flex-col gap-15 w-container max-md:gap-5">
        <div className="flex flex-col gap-5">
          <Heading1>
            Ils nous font <PrimaryColorSpan>confiance</PrimaryColorSpan>
          </Heading1>
          <div className="flex items-center flex-wrap gap-5 *:max-w-[30%]">
            <img src="images/cb-21-logo.avif" alt="Tour CB21 logo" />
            <img src="images/engie-logo.avif" alt="Engie logo" />
            <img src="images/tour-eiffel-logo.avif" alt="Tour Eiffel logo" />
            <img src="images/ratp-logo.avif" alt="RATP logo" />
            <img
              src="images/paris-diderot-logo.avif"
              alt="Paris Diderot logo"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Heading1 className="max-md:mb-1.5 text-balance">
            Vous avez un <PrimaryColorSpan>projet</PrimaryColorSpan> ?
          </Heading1>
          <ContactInfo />
          <TextBody>
            Nous répondons à toutes vos questions, tous les jours de 9h à 19h.
          </TextBody>
        </div>
      </CascadeRevealElement>
    </div>
  );
};

export default Contact;
