const express = require('express')
const authController = require('./../controllers/authController')
const locationController = require('./../controllers/locationController')
const router = express.Router()

router.post('/addLocation/:id',
 locationController.addLocation
)
router.get('/userLocation/:id',
    locationController.getLocationByUsingUserId)
router.get('/driverLocation/:id',
    locationController.getLocationByUsingDriverId)
router
    .route('/')
    .get(locationController.getAlllocationDetails)

router
    .route('/:id')
    .get(locationController.getLocationById)
    .delete(locationController.deletelocationDataUsingId)
    .patch(locationController.updateLocationDataUsingId)


module.exports = router