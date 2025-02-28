import { usePrefersColorScheme } from '@anatoliygatt/use-prefers-color-scheme';
import { CircleCheck, Mail, PhoneForwarded } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import copyButtonValue from '../utils/copyValueToClipboard';
import ClipboardButton from './ui/ClipboardButton';

const ContactInfo = ({ className }: { className?: string }) => {
  const preferredColorScheme = usePrefersColorScheme();
  const isDarkColorSchemePreferred = preferredColorScheme === 'dark';

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    copyButtonValue(e);
    toast('Copié', {
      style: {
        width: 'fit-content',
        fontSize: 'var(--text-body-desktop)',
        fontWeight: 'var(--font-weight-body-desktop)',
        fontFamily: 'Unbounded',
        boxShadow: 'none',
        borderRadius: '0.8rem',
      },
      icon: (
        <CircleCheck color="var(--color-green)" size={20} strokeWidth={3} />
      ),
    });
  };

  return (
    // I choose to use the text-body-desktop class here instead of put it in each component.
    <address
      className={`not-italic flex flex-row gap-[var(--spacing-2xl)] text-body-desktop font-body-desktop items-center ${
        className || ''
      }`}>
      <ClipboardButton handleCopy={handleCopy} value="example@example.com">
        <Mail color="var(--color-primary)" size={20} strokeWidth={3} />
        example@example.com
      </ClipboardButton>
      <ClipboardButton handleCopy={handleCopy} value="+33612345678">
        <PhoneForwarded
          color="var(--color-primary)"
          size={20}
          strokeWidth={3}
        />
        +33612345678
      </ClipboardButton>
      <Toaster
        expand
        visibleToasts={3}
        duration={1500}
        theme={isDarkColorSchemePreferred ? 'dark' : 'light'}
      />
    </address>
  );
};

export default ContactInfo;
