const Packaging = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const savedPackaging = await Packaging.findOne({ name: result.value.name });
  if (savedPackaging) {
    return res.status(400).json({ error: "Packaging already in use" });
  }
  const newPackaging = new Packaging();
  newPackaging.name = result.value.name;

  try {
    await newPackaging.save();
    return res.status(200).json({ status: "Packaging saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
