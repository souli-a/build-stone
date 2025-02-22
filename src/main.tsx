import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import './styles/index.css';
import './utils/magneticElement';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
