const StocktakingProduct = require("../schema");
const Warehouse = require("../../warehouse/schema");
const Product = require("../../product/schema");
const Joi = require("joi");

const serializer = Joi.object({
  warehouse_id: Joi.string().length(24).required(),
  product_id: Joi.string().length(24).required(),
  counted_quantity: Joi.number().positive().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);

  await newStocktakingProduct.save();
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

  const stock = await Stock.find({ warehouse_id: warehouseExists._id, product_id: element.product_id });
  if(!stock){
    return res.status(400).json({ error: "Stock doesn't exist" });
  }

  try {
    await StocktakingProduct.findByIdAndUpdate(req.params.id, {
      product_id: result.value.warehouse_id,
      real_quantity: stock.quantity,
      counted_quantity: result.value.counted_quantity
    });
    return res.status(200).json({ status: "Stocktaking product successfully edited"});
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
