import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Joi from "joi";
import { parseError, sessionizeUser } from "../util/helpers.js";

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string()
          .pattern(new RegExp('^[a-zA-Z ]{3,30}$'))
          .required(),
    
      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
    
      email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
          .required()
    })

    await schema.validateAsync(
      { username: req.body.username, 
        password: req.body.password, 
        email: req.body.email 
      });    
    
    const newUser = new User(req.body);
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
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