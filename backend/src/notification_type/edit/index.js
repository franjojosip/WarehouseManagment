const NotificationType = require("../schema");
const Joi = require("joi");

const serializer = Joi.object({
  name: Joi.string().required()
});

async function edit(req, res) {
  try {
    const result = serializer.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: "Poslani su neispravni podatci!" });
    }

    const type = await NotificationType.findById(req.params.id);

    if (type.name != result.value.name) {
      const typeExists = await NotificationType.findOne({ name: result.value.name });
      if (typeExists) {
        return res.status(400).json({ error: "Tip notifikacije se već koristi!" });
      }
    }

    type.name = result.value.name;

    await type.save();
    return res.status(200).json({ status: "Uspješno izmjenjen tip notifikacije!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = edit;
