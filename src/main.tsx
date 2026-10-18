import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RegionProvider } from './context/RegionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegionProvider>
      <App />
    </RegionProvider>
  </StrictMode>,
);
