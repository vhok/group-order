const express = require('express');
const { verifyToken } = require('./../utils/tokenMiddleware');

const router = express.Router();

router.use(verifyToken);

router.route('/orderinfo')
    .get( (req, res) => {
        try {
            console.log('test');

            res.json({message: 'empty object'});

        } catch(err) {
            console.error(err);
        }
    })

module.exports = router;