import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  cc: [
    {
      type: String,
      required: false,
    },
  ],
  subject: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  attachments: {
    filename: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
  },
});

const Email = mongoose.model("Email", emailSchema);

export default Email;
