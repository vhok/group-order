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
    note: {
        type: String,
        default: '',
    },
});

// Note: If you require a module with exports specified in this way, it won't produce the exports object, rather the "main" export (ie mongoose.model() ).
module.exports = mongoose.model('Item', itemSchema);
module.exports.itemSchema = itemSchema;