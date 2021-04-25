const jwt = require('jsonwebtoken');

// ENVIRONMENT VARIABLES DEV-ONLY
const dotenv = require('dotenv');
dotenv.config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;


exports.createToken = (payload) => {
    const token = jwt.sign(payload, TOKEN_SECRET_KEY);
    return token;
};

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};

// Experimental - see if simplified version works.
exports.verifyToken2 = (token) => {
    return jwt.verify(token, TOKEN_SECRET_KEY);
};