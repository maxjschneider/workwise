import Joi from 'joi';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import { MongoClient } from "mongodb";
import { signUp } from '../validations/user.js';
import { parseError, sessionizeUser } from "../util/helpers.js";

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const { username, email, password } = req.body
    await Joi.validate({ username, email, password }, signUp);    
    
    const newUser = new User({ username, email, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get("/", async (req, res) => {
  const connectionString = process.env.ATLAS_URI || "";
  const client = new MongoClient(connectionString);

  let conn;
  try {
    console.log("Connecting to MongoDB Atlas...");
    conn = await client.connect();
  } catch(e) {
    console.error(e);
  }
  let db = conn.db("workwise");
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!user) {
        res.send(JSON.stringify("Not found")).status(404);
    } else {
        res.send(user).status(200);
    }
});

export default userRouter;