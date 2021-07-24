const StocktakingProduct = require("../schema");

async function remove(req, res) {
  try {
    await StocktakingProduct.findByIdAndRemove(req.params.id);
    return res.status(200).json({ status: "Uspješno obrisano stanje proizvoda za inventuru!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
