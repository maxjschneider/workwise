import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Shift from '../models/shift.js';
import Joi from "joi";
import { parseError, sessionizeUser } from "../util/helpers.js";
import ShiftEntry from '../models/shift.js';

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string()
          .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
          .required(),

      lastName: Joi.string()
          .pattern(new RegExp('^[a-zA-Z]{2,30}$'))
          .required(),
    
      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
    
      email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
          .required()
    })

    await schema.validateAsync(
    { 
      firstName: req.body.firstName,
      lastName: req.body.lastName, 
      password: req.body.password, 
      email: req.body.email 
    });    
    
    const newUser = new User(req.body);
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;
    req.session.save();

    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get("/", async (req, res) => {
    const users = await User.find({  });

    res.send(users).status(200);
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

userRouter.get("/hours/:id", async (req, res) => {
  const id = req.params.id;
  
  const shifts = await ShiftEntry.find({ user_id: id, end: {$ne: new Date("1975-11-11T11:11:11.111+00:00")} });

  var status = { hours: 0.0, clockedIn: false };

  for (let i = 0; i < shifts.length; i++) {
    status.hours += Math.abs(shifts[i].end - shifts[i].start) / 36e5;
  }

  const currentShift = 
    await ShiftEntry.findOne({user_id: id, end: new Date("1975-11-11T11:11:11.111+00:00")});

  if (currentShift != null)  {
    status.clockedIn = true;
  }

  if (!shifts) {
      res.send(JSON.stringify("Error")).status(404);
  } else {
      res.send(JSON.stringify(status)).status(200);
  }
});

export default userRouter;