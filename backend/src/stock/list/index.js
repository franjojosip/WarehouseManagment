const Stock = require("../schema");

async function list(req, res) {
  try {
    let stocks = await Stock.find({}).populate("warehouse_id", { name: 1 }).populate("product_id", { name: 1 });
    stocks = stocks.map((stock) => {
      return {
        id: stock.id,
        warehouse: notification.warehouse_id.name,
        product: notification.product_id.name,
        quantity: notification.quantity,
        minimum_quantity: notification.minimum_quantity
      };
    });
    return res.status(200).json({ stocks });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = list;
