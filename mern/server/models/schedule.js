import mongoose from 'mongoose';

// THIS IS PROBABLY BROKEN BECAUSE YOURE TRYING TO ACCESS PRE  EXISTING RECORDS, TRY INSERTING THEM WITH THIS SCHEMA!!!

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

const ScheduleEntry = mongoose.model('schedule', ScheduleEntrySchema, "schedule");
export default ScheduleEntry;