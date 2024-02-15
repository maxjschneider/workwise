import mongoose from 'mongoose';

const ScheduleEntrySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true,
    default: new Date("1975-11-11T11:11:11.111+00:00")
  }
});

const ScheduleEntry = mongoose.model("schedule", ScheduleEntrySchema, "schedule");
export default ScheduleEntry;