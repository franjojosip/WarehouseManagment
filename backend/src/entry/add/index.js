const Entry = require("../schema");
const Warehouse = require("../../warehouse/schema");
const Product = require("../../product/schema");
const User = require("../../users/schema");
const Joi = require("joi");

const serializer = Joi.object({
  warehouse_id: Joi.string().length(24).required(),
  product_id: Joi.string().length(24).required(),
  user_id: Joi.string().length(24).required(),
  quantity: Joi.number().positive().required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const warehouseExists = await Warehouse.findById(result.value.warehouse_id);
  if (!warehouseExists) {
    return res.status(400).json({ error: "Warehouse doesn't exist" });
  }

  const productExists = await Product.findById(result.value.product_id);
  if (!productExists) {
    return res.status(400).json({ error: "Product doesn't exist" });
  }

  const userExists = await User.findById(result.value.user_id);
  if (!userExists) {
    return res.status(400).json({ error: "User doesn't exist" });
  }

  const newEntry = new Entry();
  newEntry.warehouse_id = result.value.warehouse_id;
  newEntry.product_id = result.value.product_id;
  newEntry.user_id = result.value.user_id;
  newEntry.quantity = result.value.quantity;

  try {
    await newEntry.save();
    return res.status(200).json({ status: "Entry saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
