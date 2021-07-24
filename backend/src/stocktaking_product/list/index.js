const StocktakingProduct = require("../schema");

async function list(req, res) {
  try {
    let stocktakingProducts = await StocktakingProduct.find({}).populate("product_id", { name: 1 });
    stocktakingProducts = stocktakingProducts.map((product) => {
      return {
        id: product.id,
        product_name: product.product_id.name,
      };
    });
    return res.status(200).json({ stocktakingProducts });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
