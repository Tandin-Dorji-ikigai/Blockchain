const express = require('express')
const contactController = require('../controllers/contactController')
const router = express.Router()

router.post('/replyContact', contactController.SendContactReply)

router
    .route('/')
    .get(contactController.getAllContact)
    .post(contactController.createContact)

router.route('/:id')
    .get(contactController.getContact)
    .patch(contactController.updateContact)
    .delete(contactController.deleteContact)

module.exports = router