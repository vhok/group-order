const express = require('express');
const { createUser, findUserById } = require('./../services/userService');
const { verifyToken } = require('./../utils/tokenMiddleware');
const { createToken } = require('./../services/tokenService');

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

            // create token and specify payload
            const token = createToken({ id: user._id })

            // respond to post request by returning a token
            res.status(200).json({ access_token: token });

        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }

    });

    router.route('/userinfo')
        .get(verifyToken, async (req, res) => {
            try {
                const { id } = req.user;
                const user = await findUserById(id)
                res.json(user);
            } catch(err) {
                if(err.message && err.message === 'not found') {
                    return res.status(404).json({ message: 'user not found' });
                }
                return res.status(500).json({ message: 'internal server error' });
            }
        });
        
// exports the actual router
module.exports = router;
