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
    return res.status(200).json({ cities: cities.sort(compare) });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

function compare(a, b) {
  if (a.name[0] < b.name[0]) {
    return -1;
  }
  if (a.name[0] > b.name[0]) {
    return 1;
  }
  return 0;
}

module.exports = list;
