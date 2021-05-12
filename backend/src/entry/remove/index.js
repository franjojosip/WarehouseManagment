const Entry = require("../schema");

async function remove(req, res) {
  try {
    const savedEntry = await Entry.findById(req.params.id);
    if (savedEntry) {
      await Entry.findByIdAndRemove(req.params.id);
      return res.status(200).send("Entry removed");
    } else {
      return res.status(404).send("Entry not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
