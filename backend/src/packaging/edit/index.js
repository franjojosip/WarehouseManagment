const Packaging = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }
  
  const packaging = await Packaging.findById(req.params.id);

  if(packaging.name.toLowerCase() != result.value.name.toLowerCase()){
    const nameExists = await Packaging.findOne({name: result.value.name});
    if(nameExists){
      return res.status(400).json({ error: "Packaging already in use" });
    }
  }
  
  try {
    await Packaging.findByIdAndUpdate(req.params.id, {
      name: result.value.name
    });
    return res.status(200).json({ status: "Packaging successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;
