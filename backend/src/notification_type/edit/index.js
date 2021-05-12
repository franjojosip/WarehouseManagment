const NotificationType = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function edit(req, res) {
  const result = serializer.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const type = await NotificationType.findById(req.params.id);

  if(type.name != result.value.name){
    const typeExists = await NotificationType.findOne({name: result.value.name});
    if(typeExists){
      return res.status(400).json({ error: "Notification type already in use" });
    }
  }

  type.name = result.value.name;

  try {
    await type.save();
    return res.status(200).json({ status: "Notification type successfully edited" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = edit;