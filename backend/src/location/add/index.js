const Location = require("../schema");
const City = require("../../city/schema");
const Joi = require("joi");

const serializer = Joi.object({
  street: Joi.string().required(),
  city_id: Joi.string().length(24).required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const locationExists = await Location.findOne({ street: result.value.street });
  const cityExists = await City.findOne({ _id: result.value.city_id });

  if (locationExists) {
    return res.status(400).json({ error: "Location already in use" });
  }
  if (!cityExists) {
    return res.status(404).json({ error: "City not found" });
  }

  const newLocation = new Location();
  newLocation.street = result.value.street;
  newLocation.city_id = result.value.city_id;

  try {
    await newLocation.save();
    return res.status(200).json({ status: "Location saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
