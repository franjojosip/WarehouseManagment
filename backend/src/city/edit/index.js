const City = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  zip_code: Joi.number().required(),
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const city = await City.findById(req.params.id);

  if(city.zip_code != result.value.zip_code){
    const zipCodeExists = await City.findOne({zip_code: result.value.zip_code});
    if(zipCodeExists){
      return res.status(400).json({ error: "Zip code already in use" });
    }
  }

  city.name = result.value.name;
  city.zip_code = result.value.zip_code;

  try {
    await city.save();
    return res.status(200).json({ status: "City successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
