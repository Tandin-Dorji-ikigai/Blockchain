const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const vehicleController = require("./../controllers/vehicleController")
const { route } = require('../app')
const router = express.Router()



router.post('/forgot-password', authController.forgotPassword)
router.get('/reset-password/:id/:token', authController.resetPassword);
router.post('/reset-password/:id/:token', authController.updatePassword);

router.post('/signup', userController.uploadUserPhoto, authController.signup)
router.post('/driverSignup', userController.uploadUserPhoto, authController.driverSignup, vehicleController.createDriver)

router.post('/verifiyEmail/:id', authController.verifyEmail)
router.get('/verifiyEmail/:id', authController.getEmail)

router.post('/login', authController.login)
router.post('/getcookiedetails', authController.getDetailOfCookie)
// router.route('/updateMe').patch(authController.protect,userController.uploadUserPhoto,userController.updateMe)
router.route('/updateMe').patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
// router.patch('/photoAndEmail',
//             authController.protect,
//             userController.uploadUserPhoto,
//             userController.uploadImageANdEmail)
// router
//     .route('/updateMe')
//     .patch(authController.protect,userController.uploadUserPhoto,userController.updateMe)



router
    .route('/')
    // .get(authController.protect, userController.getAllUser)
    .get(userController.getAllUser)
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.get('/searchAccount/:id', userController.searchAddress)





module.exports = router