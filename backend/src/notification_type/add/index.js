const NotificationType = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function add(req, res) {
  try {
    const result = serializer.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: "Poslani su neispravni podatci!" });
    }

    const notificationTypeExist = await NotificationType.findOne({ name: result.value.name })
    if (notificationTypeExist) {
      return res.status(400).json({ error: "Tip notifikacije s istim nazivom već postoji!" });
    }
    const newNotificationType = new NotificationType();
    newNotificationType.name = result.value.name;

    await newNotificationType.save();
    return res.status(200).json({ status: "Uspješno kreiran tip notifikacije!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = add;
