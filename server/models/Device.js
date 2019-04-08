const mongoose = require("mongoose");

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

let deviceSchema = new mongoose.Schema({
    model: {
        type: mongoose.Schema.Types.String,
        required: REQUIRED_VALIDATION_MESSAGE,
        unique: [true, "Model already exists."]
    }, 
    typeDevice: [{ type: mongoose.Schema.Types.String }], 
    creator: {
        type: mongoose.Schema.Types.String,
        required: REQUIRED_VALIDATION_MESSAGE
    }, 
    description: { type: mongoose.Schema.Types.String },
    price: {
        type: mongoose.Schema.Types.Number,
        required: REQUIRED_VALIDATION_MESSAGE
    }, //remove
    image: {
        type: mongoose.Schema.Types.String,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    likes: [{ type: mongoose.Schema.Types.Number }],
    reviews: [{ type: mongoose.Schema.Types.String }],
    isBorrowed: { type: mongoose.Schema.Types.Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now }

});

let Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
