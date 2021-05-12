const Category = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const categoryExists = await Category.findOne({ name: result.value.name });
  if (categoryExists) {
    return res.status(400).json({ error: "Category already exists" });
  }
  const newCategory = new Category();
  newCategory.name = result.value.name;

  try {
    await newCategory.save();
    return res.status(200).json({ status: "Category saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
