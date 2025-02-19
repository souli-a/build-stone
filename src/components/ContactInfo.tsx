import { CircleCheck, Mail, PhoneForwarded } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import copyButtonValue from '../utils/copyValueToClipboard';
import ClipboardButton from './ClipboardButton';

const ContactInfo = () => {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    copyButtonValue(e);
    toast.success('Copié !', {
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
      <Toaster gutter={10} />
      <ClipboardButton handleCopy={handleCopy} value="example@example.com">
        <Mail color="var(--color-primary)" size={20} />
        example@example.com
      </ClipboardButton>
      <ClipboardButton handleCopy={handleCopy} value="+33612345678">
        <PhoneForwarded color="var(--color-primary)" size={20} />
        +33612345678
      </ClipboardButton>
    </address>
  );
};

export default ContactInfo;
