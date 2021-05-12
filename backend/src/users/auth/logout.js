module.exports = logout;
const User = require("../schema");

async function logout(req, res) {
  const user = await User.findOne({ refreshToken: req.body.refreshToken });
  if (user) {
    user.refreshToken = "";
    await user.save();
    return res.json({ msg: "User successfully logged out!" });
  }
  else return res.sendStatus(400);
}