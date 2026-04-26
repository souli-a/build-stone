import { ReactLenis } from "lenis/react";
import { startTransition, useState } from "react";
import EntryLoader from "./components/EntryLoader";
import MouseCursor from "./components/MouseCursor";
import AboutUs from "./sections/AboutUs";
import Book from "./sections/Book";
import Contact from "./sections/Contact";
import Experiences from "./sections/Experiences";
import GeographicResponse from "./sections/GeographicResponse";
import HomePage from "./sections/HomePage";
import Process from "./sections/Process";
import Services from "./sections/Services";

const App = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const handleLoaderComplete = () => {
    startTransition(() => {
      setIsLoaderVisible(false);
    });
  };

  return (
    <ReactLenis root>
      <MouseCursor />
      {isLoaderVisible ? (
        <EntryLoader onComplete={handleLoaderComplete} />
      ) : null}
      <HomePage isRevealed={!isLoaderVisible} />
      {!isLoaderVisible ? (
        <>
          <AboutUs />
          <Services />
          <Experiences />
          <Process />
          <GeographicResponse />
          <Book />
          <Contact />
        </>
      ) : null}
    </ReactLenis>
  );
};

export default App;
