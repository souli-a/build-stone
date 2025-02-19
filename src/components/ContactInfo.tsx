import { Mail, PhoneForwarded } from 'lucide-react';
import copyButtonValue from '../utils/copyValueToClipboard';

const ContactInfo = () => {
  return (
    <address className="not-italic flex flex-row gap-[var(--spacing-2xl)] text-body-desktop">
      <div className="flex flex-row gap-[var(--spacing-md)] items-center">
        <Mail color="var(--color-primary)" size={20} />
        <button
          onClick={copyButtonValue}
          className="select-auto"
          value="example@example.com">
          example@example.com
        </button>
      </div>
      <div className="flex flex-row gap-[var(--spacing-md)] items-center">
        <PhoneForwarded color="var(--color-primary)" size={20} />
        <button
          onClick={copyButtonValue}
          className="select-auto"
          value="+33612345678">
          +33612345678
        </button>
      </div>
    </address>
  );
};

export default ContactInfo;
