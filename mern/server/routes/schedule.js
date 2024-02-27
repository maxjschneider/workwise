import express from "express";
import ScheduleEntry from "../models/schedule.js";
import User from "../models/user.js";

import { parseError } from "../util/helpers.js";

const scheduleRouter = express.Router();

scheduleRouter.post("", async (req, res) => {
  try {
    const { user_id, day, start, end, enabled } = req.body;

    var entry = new ScheduleEntry({ user_id, day, start, end, enabled });
    entry.save();

    res.send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
});

scheduleRouter.get("/day/:day", async (req, res) => {
  const targetDay = req.params.day;
  var response = await ScheduleEntry.find({ day: targetDay });

  var result = [];

  for (let i = 0; i < response.length; i++) {
    const user = await User.findOne({ _id: response[i].user_id });

    // make a deep copy because for some reason response is not modifiable??
    let dict = JSON.parse(JSON.stringify(response[i]));

    dict.firstName = user.firstName;
    dict.lastName = user.lastName;
    dict.position = user.position;

    result.push(dict);
  }

  res.send(result).status(200);
});

scheduleRouter.post("/update", async (req, res) => {
  try {
    const { _id, update } = req.body;

    const scheduleEntry = await ScheduleEntry.findOne({ _id: _id });

    if (scheduleEntry == null) {
      res.send(JSON.stringify("User is not clocked in."));
      return;
    }

    await scheduleEntry.updateOne(update);

    res.send(JSON.stringify("Clock out successful."));
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

export default scheduleRouter;
