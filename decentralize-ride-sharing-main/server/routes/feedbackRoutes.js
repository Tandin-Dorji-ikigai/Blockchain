const express = require('express')
const feedbackController = require('../controllers/feedbackController')
const router = express.Router()

router
    .route('/')
    .get(feedbackController.getAllFeedback)

router.route('/:id')
    .post(feedbackController.createFeedback)
    .get(feedbackController.getFeedback)
    .patch(feedbackController.updateFeedback)
    .delete(feedbackController.deleteFeedback)

module.exports = router