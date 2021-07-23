const Role = require("../schema");
const User = require("../../users/schema");

async function remove(req, res) {
  if(req.body.password == null || req.body.password != process.env.SUPER_ADMIN_PASSWORD){
    return res.status(403).send("Invalid password");
  }
  try {
    const savedRole = await Role.findById(req.params.id);
    if (savedRole) {
      const users = User.find({ role_id: savedRole._id });
      if (users.length > 0) {
        return res.status(400).send("There are users connected with this role");
      } else {
        await Role.findByIdAndRemove(req.params.id);
        return res.status(200).send("Role removed");
      }
    } else {
      return res.status(404).send("Role not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
