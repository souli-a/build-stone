import { usePrefersColorScheme } from '@anatoliygatt/use-prefers-color-scheme';
import { CircleCheck, Mail, PhoneForwarded } from 'lucide-react';
import { createPortal } from 'react-dom';
import { toast, Toaster } from 'sonner';
import useWindowWidth from '../hooks/useWindowWidth';
import copyToClipboard from '../utils/copyToClipboard';
import ClipboardButton from './ui/ClipboardButton';
import TextBodyDesktop from './ui/TextBodyDesktop';

const ContactInfo = ({ className }: { className?: string }) => {
  const preferredColorScheme = usePrefersColorScheme();
  const isThemeDark = preferredColorScheme === 'dark';
  const windowWidth = useWindowWidth();
  const iconSize = windowWidth >= 768 ? 20 : 13;

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    copyToClipboard(e);
    toast('Copié', {
      style: {
        width: 'fit-content',
        fontSize: 'var(--text-body-desktop)',
        fontWeight: 'var(--font-weight-body-desktop)',
        fontFamily: 'Unbounded',
        boxShadow: 'none',
        borderRadius: '1rem',
      },
      icon: (
        <CircleCheck color="var(--color-green)" size={20} strokeWidth={3} />
      ),
    });
  };

  return (
    <address
      className={`not-italic flex flex-wrap gap-5 max-md:gap-2 ${
        className || ''
      }`}>
      <ClipboardButton handleCopy={handleCopy} value="example@example.com">
        <Mail
          className="mt-[0.1rem]"
          color="var(--color-primary)"
          size={iconSize}
          strokeWidth={3}
        />
        <TextBodyDesktop>example@example.com</TextBodyDesktop>
      </ClipboardButton>
      <ClipboardButton handleCopy={handleCopy} value="+33612345678">
        <PhoneForwarded
          color="var(--color-primary)"
          size={iconSize}
          strokeWidth={3}
        />
        <TextBodyDesktop>+33612345678</TextBodyDesktop>
      </ClipboardButton>
      {createPortal(
        <Toaster
          visibleToasts={3}
          duration={1500}
          theme={isThemeDark ? 'dark' : 'light'}
          position="bottom-right"
          offset={'3rem'}
        />,
        document.body
      )}
    </address>
  );
};

export default ContactInfo;
