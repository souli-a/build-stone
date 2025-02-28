import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import BuyingProcess from './pages/BuyingProcess';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SolutionsOverview from './pages/SolutionsOverview';
import './styles/index.css';
import './utils/magneticElement';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="text-dark bg-light min-h-dvh">
      <Home />
      <AboutUs />
      <SolutionsOverview />
      <BuyingProcess />
      <Contact />
      <Footer />
    </div>
  </StrictMode>
);
