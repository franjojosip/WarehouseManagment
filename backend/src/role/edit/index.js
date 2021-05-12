const Role = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }
  
  await Role.findByIdAndUpdate(req.params.id, {
    name: result.value.name,
  });
  try {
    return res.status(200).json({ status: "Role successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
