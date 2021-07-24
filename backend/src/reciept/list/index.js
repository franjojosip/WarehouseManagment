const Reciept = require("../schema");

async function list(req, res) {
  try {
    let reciepts = await Reciept.find({})
      .populate("warehouse_id", { name: 1 })
      .populate("product_id")
      .populate("user_id", { fname: 1, lname: 1 });
    reciepts = reciepts.map((reciept) => {
      return {
        id: reciept.id,
        warehouse: reciept.warehouse_id.name,
        product: reciept.product_id.name,
        user: reciept.user_id.fname + " " + reciept.user_id.fname,
        quantity: reciept.quantity,
        reciept_date: reciept.date_created
      };
    });
    return res.status(200).json({ reciepts });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
