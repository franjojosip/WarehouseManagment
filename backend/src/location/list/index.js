const Location = require("../schema");

async function list(req, res) {
  try {
    let locations = await Location.find({}).populate("city_id", { name: 1 });
    locations = locations.map((location) => {
      return {
        id: location.id,
        name: location.street,
        city_id: location.city_id.id,
        city_name: location.city_id.name
      };
    });
    return res.status(200).json({ locations });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
