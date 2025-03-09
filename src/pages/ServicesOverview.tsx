import ServiceCard from '../components/ServiceCard';
import Heading1 from '../components/ui/Heading1';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const offerings = {
  mur: {
    1: 'Peinture seigneurie',
    2: 'Mate/velour/satinée',
    3: 'Boiserie',
    4: 'Glycéro',
    5: 'Impressions',
    6: 'Brossage',
  },
  plafond: {
    1: 'Faux plafond',
    2: 'Peinture',
    3: 'Dalle',
    4: 'Plaques de plâtres',
    5: 'Structure fixée',
    6: 'Rails métalliques',
  },
  sol: {
    1: 'Pose/dépose',
    2: 'Lino',
    3: 'Carrelage',
    4: 'Moquette',
    5: 'Béton ciré',
    6: 'PVC',
  },
};

const ServicesOverview = () => {
  return (
    <div className="flex justify-center p-5 pb-10 max-md:pb-5">
      <div className="flex flex-col w-container gap-5 max-md:gap-4">
        <Heading1>
          Nos <PrimaryColorSpan>solutions</PrimaryColorSpan>
        </Heading1>
        <div className="flex flex-wrap gap-5 max-md:gap-3">
          <ServiceCard title="Mur">
            {Object.values(offerings.mur).map((item, index) => (
              <TextBodyDesktop key={`mur-${index}`}>{item}</TextBodyDesktop>
            ))}
          </ServiceCard>
          <ServiceCard title="Plafond">
            {Object.values(offerings.plafond).map((item, index) => (
              <TextBodyDesktop key={`plafond-${index}`}>{item}</TextBodyDesktop>
            ))}
          </ServiceCard>
          <ServiceCard title="Sol">
            {Object.values(offerings.sol).map((item, index) => (
              <TextBodyDesktop key={`sol-${index}`}>{item}</TextBodyDesktop>
            ))}
          </ServiceCard>
        </div>
        <div className="flex flex-col max-md:hidden">
          <TextBodyDesktop className="opacity-25">
            * Liste non exhaustive
          </TextBodyDesktop>
          <TextBodyDesktop className="opacity-25">
            * N'hésitez pas à nous contacter pour plus d'informations
          </TextBodyDesktop>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
