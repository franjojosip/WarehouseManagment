const User = require("../schema");
const Entry = require("../../entry/schema");
const Stocktaking = require("../../stocktaking/schema");
const Reciept = require("../../reciept/schema");


///PROVJERA NOTIF LOG I SETTINGS PRIJE BRISANJA KORISNIKA

async function remove(req, res) {
  try {
    const savedUser = await User.findById(req.params.id);
    if (savedUser) {
      const entries = await Entry.find({ user_id: req.params.id });
      const stocktakings = await Stocktaking.find({ user_id: req.params.id });
      const reciepts = await Reciept.find({ user_id: req.params.id });
      
      if (entries.length > 0) {
        return res.status(400).json({ error: "Postoje unosi u skladište povezani s ovim korisnikom!" });
      }
      else if (stocktakings.length > 0) {
        return res.status(400).json({ error: "Postoje inventure povezane s ovim korisnikom!" });
      }
      else if (reciepts.length > 0) {
        return res.status(400).json({ error: "Postoje preuzimanja povezana s ovim korisnikom!" });
      }
      else {
        await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({ status: "Uspješno obrisan korisnik!" });
      }


    }
    else {
      return res.status(404).json({ error: "Korisnik nije pronađen!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = remove;
