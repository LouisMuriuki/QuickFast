import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  from: {
    email: {
      type: String,
      required: true,
    },
  },
  to: {
    email: {
      type: String,
      required: true,
    },
  },
  cc: [
    {
      email: {
        type: String,
        required: true,
      },
    },
  ],
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
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
      type: Number,
      required: true,
    },
  },
});

const Email = mongoose.model("Email", emailSchema);

export default Email;
