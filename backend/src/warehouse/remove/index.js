const Warehouse = require("../schema");

async function remove(req, res) {
  try {
    const savedWarehouse = await Warehouse.findById(req.params.id);
    if (savedWarehouse) {
      await Warehouse.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisano skladište!" });
    } else {
      return res.status(404).json({ error: "Skladište nije pronađeno!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
