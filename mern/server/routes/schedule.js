import express from 'express';
import ScheduleEntry from '../models/schedule.js';

const scheduleRouter = express.Router();

scheduleRouter.get("/day/:day", async (req, res) => {
    const targetDay = req.params.day;
    const result = await ScheduleEntry.find();

    console.log(targetDay);
    console.log(result);

    res.send(result).status(200);
});

export default scheduleRouter;