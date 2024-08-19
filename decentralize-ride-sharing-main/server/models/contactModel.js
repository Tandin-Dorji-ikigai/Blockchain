const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please tell us your first name!']
  },
  lastname: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide a phone Number"],

  },
  email: {
    type: String,
    // lowercase:true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  subject: {
    type: String,
    required: [true, 'PLease provide a subject!']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message!']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replied: {
    type: Boolean,
    default: false
  }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;