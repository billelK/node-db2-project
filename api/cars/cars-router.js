const express = require("express")
const model = require("./cars-model")
const {checkCarId,
        checkCarPayload,
        checkVinNumberValid,
        checkVinNumberUnique
    } = require("./cars-middleware")
const router = express.Router()

router.get("/",async (req, res, next) => {
    try {
        const allCars = await model.getAll()
        res.status(200).json(allCars)
    } catch (error) {
        next(error)
    }     
})

router.get("/:id",checkCarId, async (req,res,next) => {
    try {
        const allCars = await model.getById(req.params.id)
        res.status(200).json(allCars)
    } catch (error) {
        next(error)
    }
})

router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await model.create(req.body)
        res.status(201).json(newCar)
    } catch (error) {
        next(error)
    }
})
 
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message
    })
})

module.exports = router