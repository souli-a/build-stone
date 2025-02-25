const ButtonCTA = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <button
      className={`cursor-pointer text-title-desktop-6 text-light bg-primary rounded-[var(--border-radius-button)] px-[var(--spacing-2xl)] py-[var(--spacing-3xl)] font-title-desktop ${
        className || ''
      }`}>
      {children}
    </button>
  );
};

export default ButtonCTA;
