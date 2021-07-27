const Notification = require("../schema");
const NotificationType = require("../../notification_type/schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required(),
  notification_type_id: Joi.string().length(24).required()
});

async function edit(req, res) {
  try {
    const result = serializer.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: "Poslani su neispravni podatci!" });
    }

    const notification = await Notification.findById(req.params.id);

    if (notification.name != result.value.name) {
      const notificationExists = await Notification.findOne({ name: result.value.name });
      if (notificationExists && notificationExists.notification_type_id == result.value.notification_type_id) {
        return res.status(400).json({ error: "Naziv notifikacije se već koristi!" });
      }
    }

    const notificationTypeExists = await NotificationType.findById(result.value.notification_type_id);
    if (!notificationTypeExists) {
      return res.status(400).json({ error: "Tip notifikacije nije pronađen!" });
    }

    notification.name = result.value.name;
    notification.notification_type_id = result.value.notification_type_id;

    await notification.save();
    return res.status(200).json({ status: "Uspješna izmjena notifikacije!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = edit;
