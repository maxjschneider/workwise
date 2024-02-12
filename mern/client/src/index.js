import React from 'react';
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import setupStore from "./store/store";
import { Provider } from "react-redux";

import { checkLoggedIn } from './util/session';


const renderApp = preloadedState => {
  const storeState = setupStore(preloadedState);

  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={storeState}>
          <App /> 
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

  window.getState = storeState.getState;
}


(async () => renderApp(await checkLoggedIn()))();
