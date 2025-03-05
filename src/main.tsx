import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProcessSteps from './pages/ProcessSteps';
import ServicesOverview from './pages/ServicesOverview';
import './styles/index.css';
import './utils/magneticElement';
import { ReactLenis } from 'lenis/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root>
      <div className="text-dark bg-light min-h-dvh dark:text-light dark:bg-dark">
        <title>Build Stone</title>
        <Home />
        <AboutUs />
        <ServicesOverview />
        <ProcessSteps />
        <Contact />
        <Footer />
      </div>
    </ReactLenis>
  </StrictMode>
);
