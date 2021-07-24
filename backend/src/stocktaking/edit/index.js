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
    return res.status(400).json({ error: "Poslani su neispravni podatci!" });
  }

  const stocktakingExists = await Stocktaking.findById(req.params.id);
  if (!stocktakingExists) {
    return res.status(400).json({ error: "Inventura nije pronađena!" });
  }

  const warehouseExists = await Warehouse.findById(result.value.warehouse_id);
  if (!warehouseExists) {
    return res.status(400).json({ error: "Skladište nije pronađeno!" });
  }

  const userExists = await User.findById(result.value.user_id);
  if (!userExists) {
    return res.status(400).json({ error: "Korisnik nije pronađen!" });
  }

  try {
    await Stocktaking.findByIdAndUpdate(req.params.id, {
      warehouse_id: result.value.warehouse_id,
      user_id: result.value.user_id,
      product_ids: result.value.stocktaking_product_ids
    });
    return res.status(200).json({ status: "Uspješna izmjena inventure!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = edit;
