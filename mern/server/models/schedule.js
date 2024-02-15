import mongoose from 'mongoose';

const ScheduleEntrySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  }
});

const ScheduleEntry = mongoose.model("schedule", ScheduleEntrySchema);
export default ScheduleEntry;