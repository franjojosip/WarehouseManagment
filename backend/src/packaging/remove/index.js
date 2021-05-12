const Packaging = require("../schema");

async function remove(req, res) {
  try {
    const savedPackage = await Packaging.findById(req.params.id);
    if(savedPackage){
      await Packaging.findByIdAndRemove(req.params.id);
      return res.status(200).send("Packaging removed");
    }
    else{
      return res.status(404).send("Packaging not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
