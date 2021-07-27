const Reciept = require("../schema");
const Stock = require("../../stock/schema");

async function submit(req, res) {
  try {
    const submittedReciept = await Reciept.findById(req.params.id);
    const currentStock = await Stock.findOne({ warehouse_id: submittedReciept.warehouse_id, product_id: submittedReciept.product_id });

    if(!currentStock){
      return res.status(404).json({ error: "Proizvod ne postoji u ovome skladištu, molimo provjerite podatke!" });
    }

    if (submittedReciept && currentStock) {
      let oldQuantity = currentStock.quantity;
      if (currentStock.quantity < submittedReciept.quantity) {
        return res.status(404).json({ error: "Skladište ne sadrži željenu količinu proizvoda za preuzeti: " + submittedReciept.quantity + ".\nPreostala količina je: " + oldQuantity });
      }

      submittedReciept.isSubmitted = true;
      currentStock.quantity = oldQuantity - submittedReciept.quantity;

      await submittedReciept.save();
      await currentStock.save();

      return res.status(200).json({ status: "Uspješno potvrđen unos!" });
    } else {
      return res.status(404).json({ error: "Unos neispravan provjerite stanje!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = submit;
