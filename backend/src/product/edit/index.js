const Product = require("../schema");
const Category = require("../../category/schema");
const Subcategory = require("../../subcategory/schema");
const Packaging = require("../../packaging/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.string().length(24).required(),
  subcategory_id: Joi.string().length(24).allow(null),
  packaging_id: Joi.string().length(24).allow(null),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  let errors = [];
  let isWrongSubcategory = false;

  const categoryExists = await Category.findById(result.value.category_id);
  if (!categoryExists) {
    errors.push("Category");
  }
  
  if (result.value.packaging_id != null) {
    const packagingExists = await Packaging.findById(result.value.packaging_id);
    if (!packagingExists) {
      errors.push("Packaging");
    }
  }

  if (result.value.subcategory_id != null) {
    const subcategoryExists = await Subcategory.findById(result.value.subcategory_id);
    if (!subcategoryExists ) {
      errors.push("Subcategory");
    }
    else if(subcategoryExists.category_id != result.value.category_id){
      isWrongSubcategory = true;
    }
  }

  if (errors.length > 0) {
    if(isWrongSubcategory){
      return res.status(404).json({ error: `Wrong subcategory and ${errors.join(", ")} not found` });
    }
    else{
      return res.status(404).json({ error: `${errors.join(", ")} not found` });
    }
  }
  else if(isWrongSubcategory){
    return res.status(404).json({ error: "Wrong subcategory"});
  }

  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: result.value.name,
      category_id: result.value.category_id,
      subcategory_id: result.value.subcategory_id,
      packaging_id: result.value.packaging_id,
    });
    return res.status(200).json({ status: "Product successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
