const Subcategory = require("../schema");
const Product = require("../../product/schema");

async function remove(req, res) {
  try {
    const savedSubcategory = await Subcategory.findById(req.params.id);

    if (savedSubcategory) {
      const products = await Product.find({ subcategory_id: req.params.id });

      if(products.length > 0){
        return res.status(400).send("There are products connected with this subcategory");
      }
      else{
        await Subcategory.findByIdAndRemove(req.params.id);
        return res.status(200).send("Subcategory removed");
      }
    } else {
      return res.status(404).send("Subcategory not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
