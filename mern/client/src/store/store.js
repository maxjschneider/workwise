import { configureStore  } from "@reduxjs/toolkit";

import errorReducer from "../reducers/errors.js"
import sessionReducer  from  "../reducers/session.js"

export default (state) => {
    return configureStore({
            reducer : {
                session: sessionReducer, 
                errors: errorReducer
            },
            preloadedState: state
        }
    )
};