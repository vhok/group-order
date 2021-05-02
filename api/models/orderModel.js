const mongoose = require('mongoose');
const { Schema } = mongoose;

const { itemSchema } = require('./itemModel'); 

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [itemSchema],
    cost: Number,
    paid: Number,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('order', orderSchema);