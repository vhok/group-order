const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: String,
    description: String,
    quantity: {
        type: Number,
        default: 1,
    },
    price: Number,
    note: String,
});

module.exports = mongoose.model('Item', itemSchema);