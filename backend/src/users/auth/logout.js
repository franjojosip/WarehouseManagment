module.exports = logout;
const User = require("../schema");

async function logout(req, res) {
  try {
    const user = await User.findOne({ refreshToken: req.body.refreshToken });
    if (user) {
      user.refreshToken = "";
      await user.save();
      return res.status(200).json({ status: "Korisnik je uspješno odjavljen!" });
    }
    else return res.status(400).json({ error: "Neispravni podatci!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}