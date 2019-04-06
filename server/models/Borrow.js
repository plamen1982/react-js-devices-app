const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const borrowSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'}, //probably should be user
  borrowedDevices: [], //the original products
  date: { type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now },
  status: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Available', 'Not Available'], //Pending, Approved, Delivered
      message: 'Status is invalid, valid values include [Available, Not Available].',
    },
    default: 'Available',
    required: REQUIRED_VALIDATION_MESSAGE,
  }
});

let Borrow = mongoose.model('Borrow', borrowSchema); //Order

module.exports = Borrow;
