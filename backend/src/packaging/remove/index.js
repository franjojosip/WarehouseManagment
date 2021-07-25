const Packaging = require("../schema");

async function remove(req, res) {
  try {
    const savedPackage = await Packaging.findById(req.params.id);
    if (savedPackage) {
      await Packaging.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisana ambalaža!" });
    }
    else {
      return res.status(404).json({ error: "Ambalaža nije pronađena!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
