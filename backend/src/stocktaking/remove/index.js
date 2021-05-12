const Stocktaking = require("../schema");

async function remove(req, res) {
  try {
    const savedStocktaking = await Stocktaking.findById(req.params.id);
    if (savedStocktaking) {
      await Stocktaking.findByIdAndRemove(req.params.id);
      return res.status(200).send("Stocktaking removed");
    } else {
      return res.status(404).send("Stocktaking not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
