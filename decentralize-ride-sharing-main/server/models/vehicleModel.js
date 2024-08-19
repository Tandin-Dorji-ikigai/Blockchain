const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");

const vehicleSchema = new mongoose.Schema({
  
  vehicleModel: {
    type: String,
    required: [true, 'Please provide your vehicle model!']
  },
  plateNo: {
    type: String,
    required: [true, 'Please provide your vehicle plate number!']
  },
  licenseNo: {
    type: String,
    required: [true, 'Please provide your license number!']
  },
  vehicleColor: {
    type: String,
    required: [true, 'Please provide your vehicle color!']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, //foreign key declaration
    ref: 'User',
    required: true
  }
});



const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;




