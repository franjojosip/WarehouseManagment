const Category = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: "Poslani su neispravni podatci!" });
  }

  try {
    await Category.findByIdAndUpdate(req.params.id, {
      name: result.value.name,
    });
    return res.status(200).json({ status: "Uspješna izmjena kategorije!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = edit;
