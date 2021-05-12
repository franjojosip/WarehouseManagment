const NotificationType = require("../schema");

async function remove(req, res) {
  try {
    const savedNotificationType = await NotificationType.findById(req.params.id);
    if (savedNotificationType) {
      await NotificationType.findByIdAndRemove(req.params.id);
      return res.status(200).send("Notification type removed");
    } else {
      return res.status(404).send("Notification type not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
