import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import Router from '@/app/components/Router';
import Head from '@/app/components/Head';
import AppProvider from '@/app/providers/AppProdiver';
import DrawerProvider from '@/app/providers/DrawerProvider';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import '@/app/services/i18n';
import '@/app/services/abla';
import '@/app/services/serviceworker';

import '@/app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <Head />
        <DownloadProvider>
          <DrawerProvider>
            <Router />
          </DrawerProvider>
        </DownloadProvider>
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
