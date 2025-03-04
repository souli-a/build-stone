const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
  navigator.clipboard.writeText(event.currentTarget.textContent || '');
};

export default copyToClipboard;
