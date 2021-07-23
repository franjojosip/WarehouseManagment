const Role = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  if (result.value.password != process.env.SUPER_ADMIN_PASSWORD) {
    return res.sendStatus(403);
  }

  try {
    let value = await Role.findByIdAndUpdate(req.params.id, {
      name: result.value.name,
    });
    if (value) {
      return res.status(200).json({ status: "Role successfully edited" });
    }
    else {
      return res.status(404).json({ status: "Role not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
