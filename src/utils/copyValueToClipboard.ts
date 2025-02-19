const copyButtonValue = (event: React.MouseEvent<HTMLButtonElement>) => {
  navigator.clipboard.writeText(event.currentTarget.textContent || '');
};

export default copyButtonValue;
