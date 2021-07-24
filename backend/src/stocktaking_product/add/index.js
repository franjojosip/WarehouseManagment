const StocktakingProduct = require("../schema");
const Warehouse = require("../../warehouse/schema");
const Product = require("../../product/schema");
const Joi = require("joi");

const serializer = Joi.object({
  warehouse_id: Joi.string().length(24).required(),
  product_id: Joi.string().length(24).required(),
  counted_quantity: Joi.number().positive().required()
});

async function add(req, res) {
  const result = serializer.validate(req.body);

  await newStocktakingProduct.save();
  if (result.error) {
    return res.status(400).json({ error: "Poslani su neispravni podatci!" });
  }

  const warehouseExists = await Warehouse.findById(result.value.warehouse_id);
  if (!warehouseExists) {
    return res.status(400).json({ error: "Skladište nije pronađeno!" });
  }

  const productExists = await Product.findById(result.value.product_id);
  if (!productExists) {
    return res.status(400).json({ error: "Proizvod nije pronađen!" });
  }

  const stock = await Stock.find({ warehouse_id: warehouseExists._id, product_id: element.product_id });

  const newStocktakingProduct = new StocktakingProduct();
  newStocktakingProduct.product_id = result.value.product_id;
  newStocktakingProduct.real_quantity = stock.quantity;
  newStocktakingProduct.counted_quantity = result.value.counted_quantity;

  try {
    await newStocktakingProduct.save();
    return res.status(200).json({ status: "Uspješno spremljeno stanje proizvoda za inventuru!", id: newStocktakingProduct._id });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = add;
