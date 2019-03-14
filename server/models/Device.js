const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let deviceSchema = new mongoose.Schema({
  model: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Model already exists.']}, //title
  typeDevice: [{type: mongoose.Schema.Types.String}], //genres
  creator: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE}, //author
  description: {type: mongoose.Schema.Types.String},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  image: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  likes: [{type: mongoose.Schema.Types.String}],
  reviews: []
})

let Device = mongoose.model('Device', deviceSchema);

module.exports = Device;