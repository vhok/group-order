const mongoose = require('mongoose');
const { Schema } = mongoose;

const { orderSchema } = require('./orderModel');

const groupOrderSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    orders: {
        type: [orderSchema],
        default: [],
    },
});

module.exports = mongoose.model('GroupOrder', groupOrderSchema);