const mongoose = require('mongoose');
const { Schema } = mongoose;

const { itemSchema } = require('./itemModel');

const restaurantSchema = new Schema({
    items: [itemSchema],
    address: {
        streetNumber: Number,
        streetName: String,
        postalCode: String,
        phoneNumber: Number,
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);