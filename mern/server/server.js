import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
import cors from "cors"

import { userRouter } from './routes/index.js';
import { scheduleRouter } from './routes/index.js';
import { sessionRouter } from './routes/index.js';

import "./loadEnvironment.mjs";

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT;
const SESS_NAME = process.env.SESS_NAME;
const SESS_SECRET = process.env.SESS_SECRET;
const SESS_LIFETIME = process.env.SESS_LIFETIME;

(async () => {
  try {
    await mongoose.connect(ATLAS_URI, { useNewUrlParser: true });
    console.log('MongoDB Atlas connected');    

    const app = express();
    app.use(cors());

    const MongoStore = connectStore(session);

    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());   

    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000
      }),
      cookie: {
        sameSite: true,
        secure: false,
        maxAge: parseInt(SESS_LIFETIME)
      }
    }));

    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRouter);   
    apiRouter.use('/schedule', scheduleRouter);   
    apiRouter.use('/session', sessionRouter); 

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();