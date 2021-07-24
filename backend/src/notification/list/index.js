const Notification = require("../schema");

async function list(req, res) {
  try {
    let notifications = await Notification.find({}).populate("notification_type_id", { name: 1 });
    notifications = notifications.map((notification) => {
      return {
        id: notification.id,
        name: notification.name,
        notification_type: notification.notification_type_id.name,
      };
    });
    return res.status(200).json({ notifications });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
