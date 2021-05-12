const NotificationType = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const newNotificationType = new NotificationType();
  newNotificationType.name = result.value.name;

  try {
    await newNotificationType.save();
    return res.status(200).json({ status: "Notification type saved" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = add;