const User = require("../../users/schema");
const Role = require("../schema");

async function list(req, res) {
  let roles = await Role.find({});

  try {
    roles = roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
      };
    });
    return res.status(200).json({ roles });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
