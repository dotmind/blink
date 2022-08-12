import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from '@/app/components/Router';
import AppProvider from '@/app/providers/AppProdiver';

import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </React.StrictMode>,
);
