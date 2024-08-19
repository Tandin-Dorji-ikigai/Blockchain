const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    rating: {
      type: String,
      required: [true, 'Please provide a message!']
    },
    feedback: {
      type: String,
      required: [true, 'Please provide a message!']
    },
    ownerData: {
      type: mongoose.Schema.Types.ObjectId, //foreign key declaration
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});
  
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;