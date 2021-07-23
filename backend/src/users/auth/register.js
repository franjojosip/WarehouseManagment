const User = require("../schema");
const Role = require("../../role/schema");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const serializer = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  phone: Joi.string().required(),
});

async function register(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const userExists = await User.findOne({ email: result.value.email });
  if (userExists) {
    return res.status(400).json({ error: "Email already in use" });
  }
  const newUser = new User();
  const passwordHash = bcrypt.hashSync(result.value.password, 10);

  const roles = await Role.find({});

  if (!result.value.role || result.value.role == "Radnik") {
    result.value.role_id = getRoleId("Radnik", roles);
  } else {
    result.value.role_id = getRoleId("Administrator", roles);
  }

  newUser.fname = result.value.fname;
  newUser.lname = result.value.lname;
  newUser.email = result.value.email;
  newUser.role_id = result.value.role_id;
  newUser.phone = result.value.phone;
  newUser.password = passwordHash;

  try {
    await newUser.save();

    const user = await User.findOne({ email: newUser.email }).populate("role_id", {
      name: 1,
    });

    return res.json({
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        role: user.role_id.name
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

function getRoleId(name, roles) {
  return roles.filter((role) => {
    return role.name.toLowerCase() == name.toLowerCase();
  })[0]._id;
}

module.exports = register;
