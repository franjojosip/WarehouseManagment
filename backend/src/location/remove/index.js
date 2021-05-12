const Location = require("../schema");

async function remove(req, res) {
  try {
    const savedLocation = await Location.findById(req.params.id);
    if(savedLocation){
      await Location.findByIdAndRemove(req.params.id);
      return res.status(200).send("Location removed");
    }
    else{
      return res.status(404).send("Location not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
