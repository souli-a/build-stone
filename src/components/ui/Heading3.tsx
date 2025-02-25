const Heading3 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3
      className={`text-title-desktop-3 font-title-desktop ${className || ''}`}>
      {children}
    </h3>
  );
};

export default Heading3;
