const Location = require("../schema");

async function list(req, res) {
  try {
    let locations = await Location.find({}).populate("city_id", {name: 1});
    locations = locations.map((location) => {
      return {
        id: location.id,
        street: location.street,
        city: location.city_id.name
      };
    });
    return res.status(200).json({ locations });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
