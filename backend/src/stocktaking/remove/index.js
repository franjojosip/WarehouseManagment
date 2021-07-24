const Stocktaking = require("../schema");

async function remove(req, res) {
  try {
    const savedStocktaking = await Stocktaking.findById(req.params.id);
    if (savedStocktaking) {
      await Stocktaking.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisana inventura!" });
    } else {
      return res.status(404).json({ error: "Inventura nije pronađena!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
