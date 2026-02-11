const mongoose = require("mongoose");

// Subdocument schema for attachments (images, links, etc.)
const attachmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "link"],
      required: true,
    },
    // For images: base64 data URI; for links: URL string
    data: {
      type: String,
      required: true,
    },
    filename: String, // optional, useful for images
    mimeType: String, // optional, e.g. "image/png"
  },
  { _id: false }
);

// Main Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    attachments: [attachmentSchema],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
