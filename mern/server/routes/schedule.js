import express from 'express';
import ScheduleEntry from '../models/schedule.js';

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
    const result = await ScheduleEntry.find({ day: targetDay });

    res.send(result).status(200);
});

scheduleRouter.post("/update", async (req, res) => {
    try {
        // update = { field_to_update : new_value }
        // update = { day: "Monday" }

        const { _id, update } = req.body;


        const scheduleEntry = 
            await ScheduleEntry.findOne({ _id: _id });

        if (scheduleEntry == null)  {
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