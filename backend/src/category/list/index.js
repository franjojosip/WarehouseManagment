const Category = require("../schema");

async function list(req, res) {
  try {
    let categories = await Category.find({});
    categories = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
    return res.status(200).json({ categories: categories.sort(compare) });
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
