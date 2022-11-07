import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactQueryProvider from 'src/queries/Provider';
import MUIThemeProvider from 'src/theme/Provider';
import { AppProvider } from 'src/contexts/app';

const rootDiv = document.getElementById('root') as HTMLElement;
const AppRoot = ReactDOM.createRoot(rootDiv);

AppRoot.render(
  <AppProvider>
    <BrowserRouter>
      <ReactQueryProvider>
        <MUIThemeProvider>
          <App />
        </MUIThemeProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </AppProvider>,
);
