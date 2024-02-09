import express from 'express';
import ScheduleEntry from '../models/schedule.js';

const scheduleRouter = express.Router();

scheduleRouter.post("", async (req, res) => {
    try {
        const { user_id, day, start, end, enabled } = req.body;

        const entry = new ScheduleEntry({ user_id, day, start, end, enabled });
        await entry.save();

        res.send(entry);
    } catch (err) {
        res.status(400).send(err);
    }
});

scheduleRouter.get("/day/:day", async (req, res) => {
    const targetDay = req.params.day;
    const result = await ScheduleEntry.find();

    res.send(result).status(200);
});

export default scheduleRouter;