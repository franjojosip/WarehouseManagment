const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let notification_log = new Schema(
  {
    notification_id: {
      type: Schema.Types.ObjectId,
      ref: "notification",
      required: true,
    },
    subject: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  },
  { collection: "notification_logs" }
);

module.exports = mongoose.model("notification_log", notification_log);
