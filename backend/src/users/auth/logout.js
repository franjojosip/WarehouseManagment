module.exports = logout;
const User = require("../schema");

async function logout(req, res) {
  const user = await User.findOne({ refreshToken: req.body.refreshToken });
  if (user) {
    user.refreshToken = "";
    await user.save();
    return res.status(200).json({ status: "Korisnik je uspješno odjavljen!" });
  }
  else return res.status(400).json({ error: "Neispravni podatci!" });;
}