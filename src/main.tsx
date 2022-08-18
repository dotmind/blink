import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from '@/app/components/Router';
import AppProvider from '@/app/providers/AppProdiver';

import '@/app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <div className={"App"}>
        <Router />
      </div>
    </AppProvider>
  </React.StrictMode>,
);
