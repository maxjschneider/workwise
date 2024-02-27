import { configureStore } from "@reduxjs/toolkit";

import errorReducer from "../reducers/errors.js";
import sessionReducer from "../reducers/session.js";

const Store = (state) => {
  return configureStore({
    reducer: {
      session: sessionReducer,
      errors: errorReducer,
    },
    preloadedState: state,
  });
};

export default Store;
