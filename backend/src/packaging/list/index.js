const Packaging = require("../schema");

async function list(req, res) {
  try {
    let packaging = await Packaging.find({});
    packaging = packaging.map((package) => {
      return {
        id: package.id,
        name: package.name
      };
    });
    return res.status(200).json({ packaging });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
