import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import './styles/index.css';
import './utils/magneticElement';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="text-dark bg-light min-h-dvh">
      <Home />
      <AboutUs />
    </div>
  </StrictMode>
);
