import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connectStore from "connect-mongo";
import cors from "cors";

import {
  userRouter,
  scheduleRouter,
  sessionRouter,
  timeclockRouter,
  annoucementRouter,
} from "./routes/index.js";

import "./loadEnvironment.mjs";

var ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT;
const SESS_NAME = process.env.SESS_NAME;
const SESS_SECRET = process.env.SESS_SECRET;
const SESS_LIFETIME = process.env.SESS_LIFETIME;

(async () => {
  try {
    process.argv.forEach(function (val) {
      if (val === "test") {
        console.log("Test database configuration enabled.");
        // set uri to test db
        ATLAS_URI = process.env.ATLAS_TEST_URI;
      }
    });

    await mongoose.connect(ATLAS_URI, { useNewUrlParser: true });
    console.log("MongoDB Atlas connected");

    const app = express();

    // frontend
    app.use(
      cors({
        origin: "https://workwise-frontend.onrender.com/",
        credentials: true,
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const MongoStore = connectStore(session);

    app.disable("x-powered-by");

    app.use(
      session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "session",
          ttl: parseInt(SESS_LIFETIME) / 1000,
        }),
        cookie: {
          sameSite: "none",
          secure: true,
          maxAge: parseInt(SESS_LIFETIME),
          path: "/",
        },
      })
    );

    const apiRouter = express.Router();
    app.use("/api", apiRouter);
    apiRouter.use("/users", userRouter);
    apiRouter.use("/schedule", scheduleRouter);
    apiRouter.use("/session", sessionRouter);
    apiRouter.use("/timeclock", timeclockRouter);
    apiRouter.use("/announcements", annoucementRouter);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
