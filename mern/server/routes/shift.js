import express from 'express';
import ShiftEntry from '../models/shift.js.js';

const scheduleRouter = express.Router();

scheduleRouter.post("/clockin", async (req, res) => {
    try {
        const { user_id } = req.body;

        const currentShift = 
            await ShiftEntry.find({user_id: user_id, end: new Date("1975-11-11T11:11:11.111+00:00")});

        if (currentShift != null) 
            throw new Error("User is already clocked in.");

        var entry = new ShiftEntry({ 
            user_id: user_id, 
            start: Date.now().toISOString(),
            end: new Date("1975-11-11T11:11:11.111+00:00")
        });

        entry.save();

        res.send("Clock in successful.");
    } catch (err) {
        res.status(400).send(err);
    }
});

scheduleRouter.post("/clockout", async (req, res) => {
    try {
        const { user_id } = req.body;

        const currentShift = 
            await ShiftEntry.find({user_id: user_id, end: new Date("1975-11-11T11:11:11.111+00:00")});

        if (currentShift == null) 
            throw new Error("User is not clocked in.");

        await currentShift.updateOne({ end : Date.now().toISOString() });

        res.send("Clock out successful.");
    } catch (err) {
        res.status(400).send(err);
    }
});

scheduleRouter.get("/day/:day", async (req, res) => {
    const targetDay = req.params.day;
    const result = await ScheduleEntry.find({ day: targetDay });

    res.send(result).status(200);
});

export default scheduleRouter;