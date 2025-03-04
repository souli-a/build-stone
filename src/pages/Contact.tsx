import ContactInfo from '../components/ContactInfo';
import Heading1 from '../components/ui/Heading1';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const Contact = () => {
  return (
    <div className="flex items-center justify-center p-5 pb-10">
      <div className="flex flex-col gap-15 w-container">
        <div className="flex flex-col gap-5">
          <Heading1>
            Ils nous font <PrimaryColorSpan>confiance</PrimaryColorSpan>
          </Heading1>
          <div className="flex items-center flex-wrap gap-5 *:max-w-50 max-md:*:max-w-25">
            <img src="images/cb21-logo.png" alt="Tour CB21 logo" />
            <img src="images/engie-logo.png" alt="Engie logo" />
            <img src="images/tour-eiffel-logo.png" alt="Tour Eiffel logo" />
            <img src="images/ratp-logo.png" alt="RATP logo" />
            <img src="images/paris-diderot-logo.png" alt="Paris Diderot logo" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Heading1 className="max-md:mb-1.5 text-balance">
            Vous avez un <PrimaryColorSpan>projet</PrimaryColorSpan> ?
          </Heading1>
          <ContactInfo />
          <TextBodyDesktop>
            Nous répondons à toutes vos questions, tous les jours de 9h à 19h.
          </TextBodyDesktop>
        </div>
      </div>
    </div>
  );
};

export default Contact;
