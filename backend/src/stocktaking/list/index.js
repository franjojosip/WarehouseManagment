const Stocktaking = require("../schema");

async function list(req, res) {
  try {
    let stocktakings = await Stocktaking.find({}).populate("warehouse_id", { name: 1 }).populate("user_id", { fname: 1, lname: 1 });
    stocktakings = stocktakings.map((stocktaking) => {
      return {
        id: stocktaking.id,
        warehouse: stocktaking.warehouse_id.name,
        user: stocktaking.user_id.fname + " " + stocktaking.user_id.lname,
        stocktaking_products: stocktaking.product_ids,
        stocktaking_date: stocktaking.date_created
      };
    });
    return res.status(200).json({ stocktakings });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
