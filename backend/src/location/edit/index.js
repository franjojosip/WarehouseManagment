const Location = require("../schema");
const City = require("../../city/schema");
const Joi = require("joi");

const serializer = Joi.object({
  street: Joi.string().required(),
  city_id: Joi.string().length(24).required(),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const cityExists = await City.findOne({ _id: result.value.city_id });
  const location = await Location.findOne({ _id: req.params.id });

  if (!cityExists) {
    return res.status(404).json({ error: "City not found" });
  }
  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }

  location.street = result.value.street;
  location.city_id = result.value.city_id;

  try {
    await location.save();
    return res.status(200).json({ status: "City successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
