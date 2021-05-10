const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let stocktaking = new Schema(
  {
    warehouse_id: {
      type: Schema.Types.ObjectId,
      ref: "warehouse",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product_ids: [{
      type: Schema.Types.ObjectId,
    }]
  },
  {
    timestamps: true
  },
  { collection: "stocktakings" }
);

module.exports = mongoose.model("stocktaking", stocktaking);
