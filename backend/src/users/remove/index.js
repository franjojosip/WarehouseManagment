const User = require("../schema");

async function remove(req, res) {
  try {
    const savedUser = await User.findById(req.params.id);
    if (savedUser) {
      await User.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisan korisnik!" });
    }
    else {
      return res.status(404).json({ error: "Korisnik nije pronađen!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
