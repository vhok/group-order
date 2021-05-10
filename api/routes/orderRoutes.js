const express = require('express');
const { verifyToken } = require('./../utils/tokenMiddleware');
const { getOrdersByUserId } = require('./../services/orderService');
const { getOrderByUserId } = require('./../services/orderService');

const router = express.Router();

router.use(verifyToken);

router.route('/orderinfo')
    .get( async (req, res) => {
        try {
            const { id } = req.user;
            const order = await getOrderByUserId(id);
            // await getOrderByUserId(id);

            res.json(order);
        } catch(err) {
            console.error(err);
        }
    })

module.exports = router;