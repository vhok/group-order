const Orders = require('./../models/orderModel');

// An array of orders belonging to userID
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

// The latest order belonging to userID
exports.getOrderByUserId = async (userID) => {
    try {
        const orders = await Orders
            .find({ user: userID }) // always returns an array
            .sort({ dateCreated: 1 }); // orders in ascending order by date
            
        const order = await orders[orders.length-1].populate({ path: 'user', select: 'nameFirst nameLast' }).execPopulate();; // grabs the last order (ie the most recent)
            
        return order;

    } catch(err) {
        throw error;
    }
};

// Get order by the Order's ID
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