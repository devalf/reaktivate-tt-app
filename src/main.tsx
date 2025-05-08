import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './app';
import { StoreProvider } from './context/store-context';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);
