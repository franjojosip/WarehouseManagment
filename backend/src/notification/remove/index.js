const Notification = require("../schema");

async function remove(req, res) {
  try {
    const savedNotification = await Notification.findById(req.params.id);
    if (savedNotification) {
      await Notification.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisana notifikacija!" });
    } else {
      return res.status(404).json({ error: "Notifikacija nije pronađena!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
