import express from "express";
import ShiftEntry from "../models/shift.js";
import User from "../models/user.js";
import { parseError } from "../util/helpers.js";

const timeclockRouter = express.Router();

timeclockRouter.post("/clockin", async (req, res) => {
  try {
    const { user_id } = req.body;

    const currentShift = await ShiftEntry.findOne({
      user_id: user_id,
      end: new Date("1975-11-11T11:11:11.111+00:00"),
    });

    if (currentShift != null) {
      res.send(JSON.stringify("User is already clocked in."));
      return;
    }

    var now = new Date();
    // convert to EST, EST 4 hours behind so -4*60= -240
    now.setMinutes(now.getMinutes() - 240);

    var dateString = now.toISOString();

    var entry = new ShiftEntry({
      user_id: user_id,
      start: dateString,
      end: new Date("1975-11-11T11:11:11.111+00:00"),
    });

    entry.save();

    res.send(JSON.stringify("Clock in successful."));
  } catch (err) {
    console.log(err);
    res.status(400).send(parseError(err.message));
  }
});

timeclockRouter.post("/clockout", async (req, res) => {
  try {
    const { user_id } = req.body;

    const currentShift = await ShiftEntry.findOne({
      user_id: user_id,
      end: new Date("1975-11-11T11:11:11.111+00:00"),
    });

    if (currentShift == null) {
      res.send(JSON.stringify("User is not clocked in."));
      return;
    }

    var now = new Date();
    // convert to EST, EST 4 hours behind so -4*60= -240
    now.setMinutes(now.getMinutes() - 240);

    var dateString = now.toISOString();

    await currentShift.updateOne({ end: dateString });

    res.send(JSON.stringify("Clock out successful."));
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

timeclockRouter.get("/day/:day", async (req, res) => {
  const targetDay = req.params.day;
  const result = await ScheduleEntry.find({ day: targetDay });

  res.send(result).status(200);
});

timeclockRouter.get("/unapproved", async (req, res) => {
  try {
    // if (req.session.user.level < 1) {
    //  throw new Error("Unauthorized request.");
    // }

    const response = await ShiftEntry.find({
      approved: false,
      end: { $ne: new Date("1975-11-11T11:11:11.111+00:00") },
    });

    var result = [];

    for (let i = 0; i < response.length; i++) {
      const user = await User.findOne({
        _id: response[i].user_id,
      });

      // make a deep copy because for some reason response is not modifiable??
      // hack fix once again here copied from routes/schedule.js
      let dict = JSON.parse(JSON.stringify(response[i]));

      dict.firstName = user.firstName;
      dict.lastName = user.lastName;
      dict.hoursWorked = Math.abs(response[i].end - response[i].start) / 36e5;

      result.push(dict);
    }

    res.send(result).status(200);
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

timeclockRouter.get("/user/:id", async (req, res) => {
  try {
    //if (req.session.user.level < 1) {
    //throw new Error("Unauthorized request.");
    //}

    const result = await ShiftEntry.find({
      approved: true,
      user_id: req.params.id,
    });

    res.send(result).status(200);
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

timeclockRouter.post("/process", async (req, res) => {
  try {
    const { _id, approved } = req.body;
    const entry = await ShiftEntry.findOne({ _id: _id });

    if (approved) {
      await entry.updateOne({ approved: true });
    } else {
      await entry.deleteOne();
    }

    res.send(JSON.stringify("Shift processed."));
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

timeclockRouter.post("/update", async (req, res) => {
  try {
    const { _id, update } = req.body;

    const shift = await ShiftEntry.findOne({ _id: _id });

    if (shift == null) {
      res.send(JSON.stringify("Error, shift not found"));
      return;
    }

    await shift.updateOne(update);

    res.send(JSON.stringify("Shift updated successfully."));
  } catch (err) {
    res.status(400).send(parseError(err.message));
  }
});

export default timeclockRouter;
