const Entry = require("../schema");

async function list(req, res) {
  try {
    let entries = await Entry.find({}).populate("warehouse_id", { name: 1 }).populate("product_id", { name: 1 }).populate("user_id");
    entries = entries.map((entry) => {
      return {
        id: entry.id,
        warehouse: entry.warehouse_id.name,
        product: entry.product_id.name,
        user: entry.user_id.fname + " " + entry.user_id.lname,
        quantity: entry.quantity,
        entry_date: entry.date_created
      };
    });
    return res.status(200).json({ entries });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
