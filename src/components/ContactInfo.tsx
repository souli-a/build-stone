import { CircleCheck, Mail, PhoneForwarded } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import copyButtonValue from '../utils/copyValueToClipboard';
import ClipboardButton from './ClipboardButton';

const ContactInfo = () => {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    copyButtonValue(e);
    toast.success('Copié dans le presse-papiers !', {
      duration: 1000,
      position: 'top-center',
      icon: <CircleCheck color="var(--color-green)" size={20} />,
      removeDelay: 1000,
      style: {
        maxWidth: 'fit-content',
        padding: 'var(--spacing-xl)',
        backgroundColor: 'var(--color-light)',
      },
    });
  };

  return (
    <address className="not-italic flex flex-row gap-[var(--spacing-2xl)] text-body-desktop">
      <div className="flex flex-row gap-[var(--spacing-md)] items-center">
        <Mail color="var(--color-primary)" size={20} />
        <ClipboardButton handleCopy={handleCopy} value="example@example.com">
          example@example.com
        </ClipboardButton>
      </div>
      <div className="flex flex-row gap-[var(--spacing-md)] items-center">
        <PhoneForwarded color="var(--color-primary)" size={20} />
        <ClipboardButton handleCopy={handleCopy} value="+33612345678">
          +33612345678
        </ClipboardButton>
        <Toaster gutter={10} />
      </div>
    </address>
  );
};

export default ContactInfo;
