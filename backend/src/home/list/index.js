const Reciept = require("../../reciept/schema");
const Stocktaking = require("../../stocktaking/schema");
const Entry = require("../../entry/schema");
const User = require("../../users/schema");
const moment = require("../../../node_modules/moment");

async function list(req, res) {
  try {
    let reciepts = await Reciept.find({
      createdAt: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      }
    });
    let stocktakings = await Stocktaking.find({
      createdAt: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      }
    });
    let entries = await Entry.find({
      createdAt: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      }
    });
    let users = await User.find({});

    return res.status(200).json({
      data: {
        total_reciepts: reciepts.length,
        total_stocktakings: stocktakings.length,
        total_entries: entries.length,
        total_users: users.length,
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
