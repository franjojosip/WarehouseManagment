const Product = require("../schema");

async function remove(req, res) {
  try {
    const savedProduct = await Product.findById(req.params.id);
    if(savedProduct){
      await Product.findByIdAndRemove(req.params.id);
      return res.status(200).send("Product removed");
    }
    else{
      return res.status(404).send("Product not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
