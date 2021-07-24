const Notification = require("../schema");
const NotificationType = require("../../notification_type/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  notification_type_id: Joi.string().length(24).required()
});

async function add(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: "Poslani su neispravni podatci!" });
  }

  const notificationTypeExists = await NotificationType.findById(result.value.notification_type_id);
  if (!notificationTypeExists) {
    return res.status(400).json({ error: "Tip notifikacije nije pronađen" });
  }

  const notificationExists = await Notification.findOne({name: result.value.name});
  if(notificationExists && notificationExists.notification_type_id == result.value.notification_type_id){
    return res.status(400).json({ error: "Notifikacija s istim nazivom već postoji!" });
  }

  const newNotification = new Notification();
  newNotification.name = result.value.name;
  newNotification.notification_type_id = result.value.notification_type_id;

  try {
    await newNotification.save();
    return res.status(200).json({ status: "Uspješno kreiran tip notifikacije!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = add;
