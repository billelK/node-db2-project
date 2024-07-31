const model = require("./cars-model")
const vinValidator = require('vin-validator');
const db = require("../../data/db-config")

const checkCarId = async (req, res, next) => {
    const {id} = req.params
    const car = await model.getById(id)
    if (!car) {
      res.status(404).json({message:`car with id ${id} is not found`})
    } else {
      next()
    }
}

const checkCarPayload = (req, res, next) => {
    let errorMsg = ""
    const {vin, make, model, mileage} = req.body
    if (vin === undefined) {
      errorMsg = "vin is missing"
    } else if (make === undefined) {
      errorMsg = "make is missing"
    } else if (model === undefined) {
      errorMsg = "model is missing"
    } else if (mileage === undefined) {
      errorMsg = "mileage is missing"
    }

    if (errorMsg) {
      res.status(400).json({message: errorMsg})
    } else {
      next()
    }
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body
  const isVinValid = vinValidator.validate(vin)
  if(!isVinValid){
    res.status(400).json({message: `vin ${vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique =async (req, res, next) => {
  const {vin} = req.body
    const car = await db("cars").where("vin",vin)
    if(car.length === 0) {
      next()
    } else {
      res.status(400).json({
        ...car[0],
        message: `vin ${vin} already exists`
      })
    }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}