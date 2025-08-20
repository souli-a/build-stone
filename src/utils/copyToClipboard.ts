const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
  const textToCopy = event.currentTarget.textContent;
  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy);
  }
};

export default copyToClipboard;
