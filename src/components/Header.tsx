import ContactInfo from './ContactInfo';

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-5 pb-5 max-md:justify-center max-md:flex-col">
      <a
        href="/"
        className="magnetic-element"
        title="Build Stone page d'accueil">
        <img
          className="max-w-30 max-md:max-w-25"
          src="./images/build-stone-logo.avif"
          alt="Build Stone Logo"
        />
      </a>
      <ContactInfo className="max-md:justify-center" />
    </header>
  );
};

export default Header;
