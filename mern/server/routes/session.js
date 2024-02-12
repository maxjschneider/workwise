import express from "express";
import Joi from "joi";
import User from "../models/user.js";
import { parseError, sessionizeUser } from "../util/helpers.js";

const SESS_NAME = process.env.SESS_NAME;

const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
    try {
      const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
      
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
      }).with('password', 'email');

      const { email, password } = req.body;
      await schema.validateAsync({ email, password });    

      const user = await User.findOne({ email });
      if (user && user.comparePasswords(password)) {
        const sessionUser = sessionizeUser(user);    

        req.session.user = sessionUser
        res.send(sessionUser);
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (err) {
      res.status(401).send(parseError(err));
    }
});

sessionRouter.delete("", ({ session }, res) => {
    try {
      const user = session.user;

      if (user) {
        session.destroy(err => {
          if (err) {
            throw (err); 
          }       
          
          res.clearCookie(SESS_NAME);
          res.send(user);
        });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      res.status(422).send(parseError(err));
    }
});

sessionRouter.get("", ({ session: { user }}, res) => {
    res.send({ user });
});
  
export default sessionRouter;