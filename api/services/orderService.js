const Orders = require('./../models/orderModel');

exports.getOrdersByUserId = async (userID) => {
    try {
        const orders = await Orders
            .find({ user: userID }) // always returns an array
            .populate({ path: 'user', select: 'nameFirst nameLast' });

        return orders.map((order) => {
            const { _id, cost, paid, items, dateCreated } = order;
            const updatedOrder = {
                _id,
                user: {
                    nameFirst: order.user.nameFirst,
                    nameLast: order.user.nameLast,
                },
                cost,
                paid,
                items,
                dateCreated,
            };
            
            return updatedOrder;
        });
    } catch (err) {
        throw err;
    }
};

exports.getOrderById = async (id) => {
    try {
        const order = await Orders
            .findById(id)
            .populate({ path: 'user', select: 'nameFirst nameLast'});
        
        return order;
    } catch(err) {
        throw error;
    };
};