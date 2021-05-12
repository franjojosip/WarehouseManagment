const User = require("../schema");

async function remove(req, res) {
  try {
    const savedUser = await User.findById(req.params.id);
    if(savedUser){
      await User.findByIdAndRemove(req.params.id);
      return res.status(200).send("User removed");
    }
    else{
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = remove;
