const Location = require("../schema");

async function remove(req, res) {
  try {
    const savedLocation = await Location.findById(req.params.id);
    if (savedLocation) {
      await Location.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisana lokacija!" });
    }
    else {
      return res.status(404).json({ status: "Lokacija nije pronađena!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
