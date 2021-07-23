const City = require("../schema");
const Location = require("../../location/schema");

async function remove(req, res) {
  try {
    const savedCity = await City.findById(req.params.id);
    if (savedCity) {
      const locations = await Location.find({ city_id: req.params.id });

      if (locations.length > 0) {
        return res.status(400).send({ error: "Postoje lokacije povezane s ovim gradom!" });
      } else {
        await City.findByIdAndRemove(req.params.id);
        return res.status(200).send({ status: "Uspješno obrisan grad!" });
      }
    } else {
      return res.status(404).send({ error: "Nije pronađen grad!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
