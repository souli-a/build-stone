const Heading1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1
      className={`text-title-desktop-1 font-bold leading-[var(--line-height-title-desktop-1)] ${
        className || ''
      }`}>
      {children}
    </h1>
  );
};

export default Heading1;
