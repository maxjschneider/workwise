import express from "express";
import Announcement from "../models/announcement.js";
import User from "../models/user.js";

const annoucementRouter = express.Router();

annoucementRouter.get("/", async (req, res) => {
  const response = await Announcement.find();

  var result = [];

  for (let i = 0; i < response.length; i++) {
    const user = await User.findOne({ _id: response[i].user_id });

    // make a deep copy because for some reason response is not modifiable??
    let dict = JSON.parse(JSON.stringify(response[i]));

    dict.firstName = user.firstName;
    dict.lastName = user.lastName;

    result.push(dict);
  }

  res.send(result).status(200);
});

annoucementRouter.post("/post", async (req, res) => {
  try {
    const { id, message } = req.body;
    const now = new Date();

    var entry = new Announcement({ user_id: id, message: message, date: now });
    entry.save();

    res.send(entry).status(200);
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

annoucementRouter.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const entry = await Announcement.findOne({ _id: id });
    await entry.deleteOne();

    res.send(JSON.stringify("Announcement deleted.")).status(200);
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

export default annoucementRouter;
