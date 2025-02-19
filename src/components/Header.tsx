import ContactInfo from './ContactInfo';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-[var(--spacing-4xl)]">
      <a href="/" title="Build Stone Home Page">
        <img
          className="max-w-30 hover:opacity-90 active:scale-95 transition-all duration-150"
          src="./images/build-stone-logo.svg"
          alt="Build Stone Logo"
        />
      </a>
      <ContactInfo />
    </header>
  );
};

export default Header;
