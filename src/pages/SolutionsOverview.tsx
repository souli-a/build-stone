import Heading1 from '../components/ui/Heading1';
import PrimaryColorSpan from '../components/ui/PrimaryColorSpan';
import SolutionsOverviewCard from '../components/ui/SolutionsOverviewCard';
import TextBodyDesktop from '../components/ui/TextBodyDesktop';

const solutions = {
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

const SolutionsOverview = () => {
  return (
    <div className="flex justify-center items-center pt-[7.5rem]">
      <div className="flex flex-col gap-[var(--spacing-3xl)] w-[var(--width-container)]">
        <Heading1>
          Nos <PrimaryColorSpan>solutions</PrimaryColorSpan>
        </Heading1>
        <div className="flex flex-wrap gap-[var(--spacing-3xl)]">
          <SolutionsOverviewCard title="Mur">
            {Object.values(solutions.mur).map((item, index) => (
              <TextBodyDesktop key={`mur-${index}`}>{item}</TextBodyDesktop>
            ))}
          </SolutionsOverviewCard>
          <SolutionsOverviewCard title="Plafond">
            {Object.values(solutions.plafond).map((item, index) => (
              <TextBodyDesktop key={`plafond-${index}`}>{item}</TextBodyDesktop>
            ))}
          </SolutionsOverviewCard>
          <SolutionsOverviewCard title="Sol">
            {Object.values(solutions.sol).map((item, index) => (
              <TextBodyDesktop key={`sol-${index}`}>{item}</TextBodyDesktop>
            ))}
          </SolutionsOverviewCard>
        </div>
        <div className="flex flex-col gap-[var(--spacing-sm)]">
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

export default SolutionsOverview;
