const Category = require("../schema");
const Subcategory = require("../../subcategory/schema");
const Product = require("../../product/schema");

async function remove(req, res) {
  try {
    const savedCategory = await Category.findById(req.params.id);
    if (savedCategory) {
      const subcategories = await Subcategory.find({ category_id: req.params.id });
      const products = await Product.find({ category_id: req.params.id });

      if (subcategories.length > 0) {
        return res.status(400).send("There are subcategories connected with this category");
      } 
      else if(products.length > 0){
        return res.status(400).send("There are products connected with this category");
      }
      else {
        await Category.findByIdAndRemove(req.params.id);
        return res.status(200).send("Category removed");
      }
    } else {
      return res.status(404).send("Category not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
