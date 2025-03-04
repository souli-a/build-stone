const Heading6 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h6
      className={`text-title-desktop-6 text-balance font-title-desktop max-md:text-title-mobile-6 max-md:font-title-mobile ${
        className || ''
      }`}>
      {children}
    </h6>
  );
};

export default Heading6;
