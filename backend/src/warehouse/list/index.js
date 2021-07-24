const Warehouse = require("../schema");

async function list(req, res) {
  try {
    let warehouses = await Warehouse.find({}).populate("location_id", { name: 1 }).populate("users", { fname: 1, lname: 1 });
    warehouses = warehouses.map((warehouse) => {
      let users = warehouse.users.map((user) =>{
          return user.fname + user.lname
      }).join(', ')
      return {
        id: warehouse.id,
        name: warehouse.name,
        location: warehouse.location_id.name,
        users: users,
      };
    });
    return res.status(200).json({ warehouses });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

module.exports = list;
