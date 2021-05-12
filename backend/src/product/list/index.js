const Product = require("../schema");

async function list(req, res) {
  let products = await Product.find({})
    .populate("packaging_id", { name: 1 })
    .populate("category_id", { name: 1 })
    .populate("subcategory_id", { name: 1 });

  try {
    products = products.map((product) => {
      let object = {
        id: product.id,
        name: product.name,
        category: product.category_id.name
      };
      if(product.subcategory_id != null){
        object.subcategory = product.subcategory_id.name;
      }
      if(product.packaging_id != null){
        object.packaging = product.packaging_id.name;
      }
      return object;
    });
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
