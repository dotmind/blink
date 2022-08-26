import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from '@/app/components/Router';
import ModalProvider from '@/app/providers/ModalProvider';
import AppProvider from '@/app/providers/AppProdiver';
import '@/app/services/i18n';

import '@/app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </AppProvider>
  </React.StrictMode>,
);
