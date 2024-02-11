import React from 'react';
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import configureStore from './store/store';
import { Provider } from "react-redux";

import App from "./App"

let preloadedState = {};
const store = configureStore(preloadedState);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App /> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

window.getState = store.getState;