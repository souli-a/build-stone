const ClipboardButton = ({
  handleCopy,
  value,
  children,
}: {
  handleCopy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={handleCopy}
      className="w-fit h-fit select-auto flex flex-row gap-[var(--spacing-md)] items-center cursor-pointer hover:text-primary active:scale-95 transition-all duration-150"
      value={value}>
      {children}
    </button>
  );
};

export default ClipboardButton;
