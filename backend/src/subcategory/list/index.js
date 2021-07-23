const Subcategory = require("../schema");

async function list(req, res) {
  try {
    let subcategories = await Subcategory.find({}).populate("category_id", {name: 1});
    subcategories = subcategories.map((subcategory) => {
      return {
        id: subcategory.id,
        name: subcategory.name,
        category_id: subcategory.category_id.id,
        category_name: subcategory.category_id.name
      };
    });
    return res.status(200).json({ subcategories });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
