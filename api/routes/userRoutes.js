const express = require('express');
const { createUser } = require('./../services/userService');

const router = express.Router();

router.route('/signup')
    .post( async (req, res) => {
        const { nameFirst, nameLast, email, password } = req.body;

        // Validation at router level
        if (!email || email === '') {
            return res.status(400).json({ message: 'email must be provided' });
        }

        if (!password || password === '') {
            return res.status(400).json({ message: 'password must be provided' });
        }

        if (!nameFirst || nameFirst === '') {
            return res.status(400).json({ message: 'first name must be provided' });
        }

        if (!nameLast || nameLast === '') {
            return res.status(400).json({ message: 'last name must be provided' });
        }

        try {
            // create user in DB
            const user = await createUser({ email, password, nameFirst, nameLast })

            // create token

            // respond to post request
            res.status(200).json({ body: req.body });

        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }

    });

// exports the actual router
module.exports = router;
