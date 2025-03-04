const CtaButton = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <button
      className={`cursor-pointer font-title-desktop text-title-desktop-6 text-light bg-primary rounded-xl px-10 py-7 max-md:text-title-mobile-6 max-md:font-title-mobile max-md:w-fit max-md:px-7 max-md:py-5 ${
        className || ''
      }`}>
      {children}
    </button>
  );
};

export default CtaButton;
