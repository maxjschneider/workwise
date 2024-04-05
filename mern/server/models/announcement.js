import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Announcement = mongoose.model(
  "announcements",
  AnnouncementSchema,
  "announcements"
);
export default Announcement;
