const StocktakingProduct = require("../schema");

async function remove(req, res) {
  try {
    await StocktakingProduct.findByIdAndRemove(req.params.id);
    return res.status(200).send("Stocktaking product removed");
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
