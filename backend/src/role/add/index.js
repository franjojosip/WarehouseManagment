const Role = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const savedRole = await Role.findOne({ name: result.value.name });
  if (savedRole) {
    return res.status(400).json({ error: "Role already exists" });
  }
  const newRole = new Role();
  newRole.name = result.value.name;

  try {
    await newRole.save();
    return res.status(201).json({ status: "Role saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;
