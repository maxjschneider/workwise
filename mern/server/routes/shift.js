import express from "express";
import ShiftEntry from "../models/shift.js";
import { parseError } from "../util/helpers.js";

const scheduleRouter = express.Router();

scheduleRouter.post("/clockin", async (req, res) => {
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

scheduleRouter.post("/clockout", async (req, res) => {
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

scheduleRouter.get("/day/:day", async (req, res) => {
  const targetDay = req.params.day;
  const result = await ScheduleEntry.find({ day: targetDay });

  res.send(result).status(200);
});

export default scheduleRouter;
