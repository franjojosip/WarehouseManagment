const Warehouse = require("../schema");

async function remove(req, res) {
  try {
    const savedWarehouse = await Warehouse.findById(req.params.id);
    if (savedWarehouse) {
      await Warehouse.findByIdAndRemove(req.params.id);
      return res.status(200).send("Warehouse removed");
    } else {
      return res.status(404).send("Warehouse not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
