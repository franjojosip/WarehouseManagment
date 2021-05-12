const Subcategory = require("../schema");

async function remove(req, res) {
  try {
    const savedSubcategory = await Subcategory.findById(req.params.id);
    if(savedSubcategory){
      await Subcategory.findByIdAndRemove(req.params.id);
      return res.status(200).send("Subcategory removed");
    }
    else{
      return res.status(404).send("Subcategory not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
