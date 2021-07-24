const Product = require("../schema");

async function remove(req, res) {
  try {
    const savedProduct = await Product.findById(req.params.id);
    if (savedProduct) {
      await Product.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisan proizvod!" });
    }
    else {
      return res.status(404).json({ error: "Proizvod nije pronađen!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
