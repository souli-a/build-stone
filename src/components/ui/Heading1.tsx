const Heading1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1
      className={`text-title-desktop-1 text-balance leading-17 font-title-desktop max-md:leading-9 max-md:text-title-mobile-1 max-md:font-title-mobile ${
        className || ''
      }`}>
      {children}
    </h1>
  );
};

export default Heading1;
