import { configureStore  } from "@reduxjs/toolkit";

import errorReducer from "../reducers/errors.js"
import sessionReducer  from  "../reducers/session.js"

export default () => {
    return configureStore({
            reducer : {
                session: sessionReducer, 
                errors: errorReducer
            }
        }
    )
};