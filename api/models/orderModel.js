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

// Note: If you require a module with exports specified in this way, it won't produce the exports object, rather the "main" export (ie mongoose.model() ).
module.exports = mongoose.model('Order', orderSchema);
module.exports.orderSchema = orderSchema;