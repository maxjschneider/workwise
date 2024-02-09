import Joi from 'joi';
import express from 'express';
import User from '../models/user.js';
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

userRouter.get("/:id", async (req, res) => {
    const { id } = req.body;
    const user = await User.findOne({ id });

    if (!user) {
        res.send("Not found").status(404);
    } else {
        res.send(user).status(200);
    }
});

export default userRouter;