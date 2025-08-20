import { useRef } from 'react';
import useMagneticEffect from '../../hooks/useMagneticEffect';

const ClipboardButton = ({
  handleCopy,
  value,
  children,
}: {
  handleCopy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  children: React.ReactNode;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useMagneticEffect(buttonRef);

  return (
    <button
      ref={buttonRef}
      onClick={handleCopy}
      className="select-auto flex flex-row gap-2 items-center cursor-pointer"
      value={value}>
      {children}
    </button>
  );
};

export default ClipboardButton;
