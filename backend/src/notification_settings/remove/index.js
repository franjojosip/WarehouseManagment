const NotificationSetting = require("../schema");

async function remove(req, res) {
  try {
    const savedNotificationSetting = await NotificationSetting.findById(req.params.id);
    if (savedNotificationSetting) {
      await NotificationSetting.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: "Uspješno obrisan tip notifikacije!" });
    } else {
      return res.status(404).json({ error: "Tip notifikacije nije pronađen!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
