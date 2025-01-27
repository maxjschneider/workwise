import mongoose from "mongoose";

const ShiftEntrySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
    default: new Date("1975-11-11T11:11:11.111+00:00"),
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ShiftEntry = mongoose.model("shifts", ShiftEntrySchema, "shifts");
export default ShiftEntry;
