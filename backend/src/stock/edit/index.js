const Stock = require("../schema");
const Warehouse = require("../../warehouse/schema");
const Product = require("../../product/schema");
const Joi = require("joi");

const serializer = Joi.object({
  warehouse_id: Joi.string().length(24).required(),
  product_id: Joi.string().length(24).required(),
  quantity: Joi.number().positive().required(),
  minimum_quantity: Joi.number().positive().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const stockExists = await Stock.findById(req.params.id);
  if (!stockExists) {
    return res.status(400).json({ error: "Stock doesn't exist" });
  }

  const warehouseExists = await Warehouse.findById(result.value.warehouse_id);
  if (!warehouseExists) {
    return res.status(400).json({ error: "Warehouse doesn't exist" });
  }

  const productExists = await Product.findById(result.value.product_id);
  if (!productExists) {
    return res.status(400).json({ error: "Product doesn't exist" });
  }

  try {
    await Stock.findByIdAndUpdate(req.params.id, {
      warehouse_id: result.value.warehouse_id,
      product_id: result.value.product_id,
      quantity: result.value.quantity,
      minimum_quantity: result.value.minimum_quantity
    });
    return res.status(200).json({ status: "Stock successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
