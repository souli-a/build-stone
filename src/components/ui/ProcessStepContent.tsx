import Heading3 from './Heading3';
import Heading6 from './Heading6';
import TextBodyDesktop from './TextBodyDesktop';

interface ProcessStepContentProps {
  stepNumber: string;
  title: React.ReactNode | string;
  children?: React.ReactNode;
}

const ProcessStepContent = ({
  stepNumber,
  title,
  children,
}: ProcessStepContentProps) => {
  return (
    <div className="flex flex-col text-balance gap-2 max-md:gap-1">
      <Heading6>{stepNumber}</Heading6>
      <Heading3>{title}</Heading3>
      <TextBodyDesktop>{children}</TextBodyDesktop>
    </div>
  );
};

export default ProcessStepContent;
