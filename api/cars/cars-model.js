const db = require("../../data/db-config")

const getAll =async () => {
  const allDealers = await db("cars")
  return allDealers
}

const getById = async(id) => {
  const dealer = await db("cars").where("id",id).first()
  return dealer
}

const create = async (dealer) => {
  const newDealerID = await db("cars").insert(dealer)
  const createdDealer = await getById(newDealerID)
  return createdDealer
}

module.exports = {
  getAll,
  getById,
  create
}
