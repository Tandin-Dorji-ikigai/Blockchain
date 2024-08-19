const express = require('express');

const UserController = require('./../controllers/user')
const authcontroller = require('./../controllers/authController')

const router = express.Router()

router.post('/login', authcontroller.login)
router.get('/logout', authcontroller.logout)


router.get('/verifiyEmail/:id', UserController.getEmail)
router.post('/verifiyEmail/:id', UserController.verifyEmail)

router.post('/forgot-password', authcontroller.forgotPassword)
router.get('/reset-password/:id/:token', authcontroller.resetPassword);
router.post('/reset-password/:id/:token', authcontroller.updatePassword);

router
    .route('/')
    .get(UserController.getAllUsers)
    .post(UserController.uploadUserPhoto, UserController.createUser)

router
    .route('/:id')
    .get(UserController.getUserById)
    .patch(UserController.uploadUserPhoto, UserController.updateUser)
    .delete(UserController.deleteUser)


module.exports = router;