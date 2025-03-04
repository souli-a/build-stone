import Heading3 from './ui/Heading3';
import PrimaryColorSpan from './ui/PrimaryColorSpan';

const ServiceCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-fit border-1 gap-1 px-7 py-4 rounded-xl bg-grey-light-mode border-grey-border-light-mode dark:bg-blue-dark-mode dark:border-blue-border-dark-mode max-md:flex-1">
      <Heading3>
        <PrimaryColorSpan>{title}</PrimaryColorSpan>
      </Heading3>
      {children}
    </div>
  );
};

export default ServiceCard;
