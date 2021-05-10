const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let notification_setting = new Schema(
  {
    day_of_week: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    notification_id: {
      type: Schema.Types.ObjectId,
      ref: "notification",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
  { collection: "notification_settings" }
);

module.exports = mongoose.model("notification_setting", notification_setting);
