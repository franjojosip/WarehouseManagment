const Warehouse = require("../schema");
const Location = require("../../location/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  location_id: Joi.string().length(24).required(),
  users: Joi.array().min(1).required(),
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: "Poslani su neispravni podatci!" });
  }

  const locationExists = await Location.findById(result.value.location_id);
  if (!locationExists) {
    return res.status(400).json({ error: "Lokacija nije pronađena!" });
  }

  let isUserIDWrong = false;
  users.forEach((user_id) => {
    if (user_id.length != 24) {
      isUserIDWrong = true;
    }
  });
  if (isUserIDWrong) {
    return res.status(400).json({ error: "Provjerite korisnike!" });
  }

  const newWarehouse = new Warehouse();
  newWarehouse.name = result.value.name;
  newWarehouse.location_id = result.value.location_id;
  newWarehouse.users = result.value.users;

  try {
    await newWarehouse.save();
    return res.status(200).json({ status: "Uspješno kreirano skladište!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = add;
