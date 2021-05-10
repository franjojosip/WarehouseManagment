const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let notification_log = new Schema(
  {
    notification_id: {
      type: Schema.Types.ObjectId,
      ref: "notification",
      required: true,
    },
    product_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true
  },
  { collection: "notification_logs" }
);

module.exports = mongoose.model("notification_log", notification_log);
