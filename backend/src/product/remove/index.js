const User = require("../../users/schema");
const Role = require("../schema");

async function remove(req, res) {
  try {
    await Role.findByIdAndRemove(req.params.id);
    return res.status(201).send("Role removed");
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
