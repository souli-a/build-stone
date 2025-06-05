const TextBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`text-body-desktop font-body-desktop max-md:text-body-mobile max-md:font-body-mobile leading-10 max-md:leading-6 ${
        className || ''
      }`}>
      {children}
    </p>
  );
};

export default TextBody;
