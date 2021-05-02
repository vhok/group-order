const mongoose = require('mongoose');
const { Schema } = mongoose;

const { itemSchema } = require('./itemModel');

const restaurantSchema = new Schema({
    name: String,
    items: [itemSchema],
    address: {
        streetNumber: Number,
        streetName: String,
        city: String,
        province: String,
        postalCode: String,
    },
    phoneNumber: Number,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);