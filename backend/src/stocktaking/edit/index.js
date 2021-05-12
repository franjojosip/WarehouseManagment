const Stocktaking = require("../schema");
const Warehouse = require("../../warehouse/schema");
const User = require("../../users/schema");
const Joi = require("joi");

const serializer = Joi.object({
  warehouse_id: Joi.string().length(24).required(),
  user_id: Joi.string().length(24).required(),
  stocktaking_product_ids: Joi.array().min(1).required(),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const stocktakingExists = await Stocktaking.findById(req.params.id);
  if (!stocktakingExists) {
    return res.status(400).json({ error: "Stocktaking doesn't exist" });
  }

  const warehouseExists = await Warehouse.findById(result.value.warehouse_id);
  if (!warehouseExists) {
    return res.status(400).json({ error: "Warehouse doesn't exist" });
  }

  const userExists = await User.findById(result.value.user_id);
  if (!userExists) {
    return res.status(400).json({ error: "User doesn't exist" });
  }

  try {
    await Stocktaking.findByIdAndUpdate(req.params.id, {
      warehouse_id: result.value.warehouse_id,
      user_id: result.value.user_id,
      product_ids: result.value.stocktaking_product_ids
    });
    return res.status(200).json({ status: "Stocktaking successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
