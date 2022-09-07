import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import Router from '@/app/components/Router';
import Head from '@/app/components/Head';
import ModalProvider from '@/app/providers/ModalProvider';
import AppProvider from '@/app/providers/AppProdiver';
import '@/app/services/i18n';

import '@/app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <ModalProvider>
          <Head />
          <Router />
        </ModalProvider>
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
