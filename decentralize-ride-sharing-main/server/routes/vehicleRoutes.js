const express = require('express')
const vehicleController = require('../controllers/vehicleController')
const router = express.Router()

router
    .route('/')
    .get(vehicleController.getAllDriver)
    .post(vehicleController.createDriver)

router.route('/:id')
    .get(vehicleController.getDriver)
    .patch(vehicleController.updateDriver)
    .delete(vehicleController.deleteDriver)

module.exports = router