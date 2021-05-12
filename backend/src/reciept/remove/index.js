const Reciept = require("../schema");

async function remove(req, res) {
  try {
    const savedReciept = await Reciept.findById(req.params.id);
    if (savedReciept) {
      await Reciept.findByIdAndRemove(req.params.id);
      return res.status(200).send("Reciept removed");
    } else {
      return res.status(404).send("Reciept not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
