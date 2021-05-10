const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let notification = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    notification_type_id: {
      type: Schema.Types.ObjectId,
      ref: "notification_type",
      required: true,
    },
  },
  {
    timestamps: true
  },
  { collection: "notifications" }
);

module.exports = mongoose.model("notification", notification);
