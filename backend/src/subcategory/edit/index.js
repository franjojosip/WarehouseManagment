const Subcategory = require("../schema");
const Category = require("../../category/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.string().length(24).required(),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const categoryExists = await Category.findById(result.value.category_id);
  const subcategory = await Subcategory.findById(req.params.id);

  if (!categoryExists) {
    return res.status(404).json({ error: "Category not found" });
  }
  if (!subcategory) {
    return res.status(404).json({ error: "Subcategory not found" });
  }

  subcategory.name = result.value.name;
  subcategory.category_id = result.value.category_id;

  try {
    await subcategory.save();
    return res.status(200).json({ status: "Subcategory successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
