const Subcategory = require("../schema");
const Category = require("../../category/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.string().length(24).required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const categoryExists = await Category.findById(result.value.category_id);
  const subcategoryExists = await Subcategory.findOne({ name: result.value.name });

  if (!categoryExists) {
    return res.status(404).json({ error: "Category not found" });
  }
  if (subcategoryExists) {
    return res.status(400).json({ error: "Subcategory already in use" });
  }

  const newSubcategory = new Subcategory();
  newSubcategory.name = result.value.name;
  newSubcategory.category_id = result.value.category_id;

  try {
    await newSubcategory.save();
    return res.status(200).json({ status: "Subcategory saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
