const Notification = require("../schema");

async function remove(req, res) {
  try {
    const savedNotification = await Notification.findById(req.params.id);
    if (savedNotification) {
      await Notification.findByIdAndRemove(req.params.id);
      return res.status(200).send("Notification removed");
    } else {
      return res.status(404).send("Notification not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
