const Heading6 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h6
      className={`text-title-desktop-6 font-title-desktop ${className || ''}`}>
      {children}
    </h6>
  );
};

export default Heading6;
