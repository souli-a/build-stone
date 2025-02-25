const TextBodyDesktop = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`text-body-desktop font-body-desktop leading-[var(--line-height-body-desktop)] ${
        className || ''
      }`}>
      {children}
    </p>
  );
};

export default TextBodyDesktop;
