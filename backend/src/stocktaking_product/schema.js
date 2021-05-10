const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let stocktaking_product = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    real_quantity: {
      type: Number,
      required: true,
    },
    counted_quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  },
  { collection: "stocktaking_products" }
);

module.exports = mongoose.model("stocktaking_product", stocktaking_product);
