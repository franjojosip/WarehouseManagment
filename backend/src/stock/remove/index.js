const Stock = require("../schema");

async function remove(req, res) {
  try {
    const savedStock = await Stock.findById(req.params.id);
    if (savedStock) {
      await Stock.findByIdAndRemove(req.params.id);
      return res.status(200).send("Stock removed");
    } else {
      return res.status(404).send("Stock not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
