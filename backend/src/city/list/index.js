const City = require("../schema");

async function list(req, res) {
  try {
    let cities = await City.find({});
    cities = cities.map((city) => {
      return {
        id: city.id,
        name: city.name,
        zip_code: city.zip_code,
      };
    });
    return res.status(200).json({ cities });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
