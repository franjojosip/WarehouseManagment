const City = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  zip_code: Joi.number().required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const zipCodeExists = await City.findOne({ zip_code: result.value.zip_code });
  if (zipCodeExists) {
    return res.status(400).json({ error: "Zip code already in use" });
  }
  const newCity = new City();
  newCity.name = result.value.name;
  newCity.zip_code = result.value.zip_code;

  try {
    await newCity.save();
    return res.status(200).json({ status: "City saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
