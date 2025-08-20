import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';

interface ToasterPortalProps {
  isThemeDark: boolean;
}

export default function ToasterPortal({ isThemeDark }: ToasterPortalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <>
      <style>
        {`
          [data-sonner-toaster][data-sonner-theme='light'] {
            --normal-bg: var(--color-grey-light-mode);
            --normal-border: var(--color-grey-border-light-mode);
            --normal-text: var(--color-dark);
          }
          [data-sonner-toaster][data-sonner-theme='dark'] {
            --normal-bg: var(--color-blue-dark-mode);
            --normal-border: var(--color-blue-border-dark-mode);
            --normal-text: var(--color-light);
          }
        `}
      </style>
      <Toaster
        visibleToasts={3}
        duration={1500}
        theme={isThemeDark ? 'dark' : 'light'}
        position="bottom-right"
        offset={'3rem'}
      />
    </>,
    document.body
  );
}
