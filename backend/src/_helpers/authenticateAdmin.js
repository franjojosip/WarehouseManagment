const User = require("../users/schema");

async function authenticateAdmin(req, res, next) {
  const authorizedUser = await User.findOne({
    _id: req.body.userId,
  }).populate("role_id", { name: 1 });

  if (authorizedUser.role_id.name != "Administrator") return res.sendStatus(403);

  next();
}

module.exports = authenticateAdmin;
