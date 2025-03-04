const Heading3 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3
      className={`text-title-desktop-3 text-balance font-title-desktop max-md:text-title-mobile-3 max-md:font-title-mobile ${
        className || ''
      }`}>
      {children}
    </h3>
  );
};

export default Heading3;
