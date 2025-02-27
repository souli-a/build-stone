import Heading3 from './ui/Heading3';
import PrimaryColorSpan from './ui/PrimaryColorSpan';

const SolutionsOverviewCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col p-[var(--spacing-3xl)] gap-[var(--spacing-lg)] bg-[var(--color-light-grey)] rounded-[var(--border-radius-button)] border-1 border-grey-border">
      <Heading3>
        <PrimaryColorSpan>{title}</PrimaryColorSpan>
      </Heading3>
      {children}
    </div>
  );
};

export default SolutionsOverviewCard;
