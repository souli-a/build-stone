import { ReactLenis } from "lenis/react";
import { startTransition, useState } from "react";
import EntryLoader from "./components/EntryLoader";
import MouseCursor from "./components/MouseCursor";
import AboutUs from "./pages/AboutUs";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Experiences from "./pages/Experiences";
import GeographicResponse from "./pages/GeographicResponse";
import HomePage from "./pages/HomePage";
import Process from "./pages/Process";
import Services from "./pages/Services";

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
