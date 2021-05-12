const User = require("../schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const serializer = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

async function login(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const user = await User.findOne({ email: result.value.email }).populate("role_id", { name: 1 });
  if (!user) return res.status(401).json({ error: "Invalid user credentials" });

  const passwordHash = user.password;
  if (bcrypt.compareSync(result.value.password, passwordHash)) {
    const payload = {
      user: {
        id: user.id,
      },
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    user.refreshToken = refreshToken;

    await user.save();
    
    return res.json({
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role_id.name,
        accessToken,
        refreshToken: user.refreshToken,
      },
    });
  }
  return res.status(401).json({ error: "Invalid user credentials" });
}

module.exports = login;
