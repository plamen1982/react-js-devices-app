const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const borrowSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE},
  borrowedDevices: [],
  date: {type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now},
  status: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Available', 'Not Available'],
      message: 'Status is invalid, valid values include [Available, Not Available].',
    },
    default: 'Available',
    required: REQUIRED_VALIDATION_MESSAGE,
  }
});

let Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
