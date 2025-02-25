import ContactInfo from './ContactInfo';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-[var(--spacing-3xl)]">
      <a
        href="/"
        className="magnetic-element"
        title="Build Stone page d'accueil">
        <img
          className="max-w-30"
          src="./images/build-stone-logo.svg"
          alt="Build Stone Logo"
        />
      </a>
      <ContactInfo />
    </header>
  );
};

export default Header;
