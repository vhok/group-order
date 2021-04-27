const jwt = require('jsonwebtoken');

// ENVIRONMENT VARIABLES DEV-ONLY
const dotenv = require('dotenv');
dotenv.config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;


exports.createToken = (payload) => {
    const token = jwt.sign(payload, TOKEN_SECRET_KEY);
    return token;
};


// asynchronous version - refer to tokenMiddleware.js for adding "await" if you want to use this method.
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

// Note: Not recommended because it might cause a hold up.
// exports.verifyToken = (token) => {
//     return jwt.verify(token, TOKEN_SECRET_KEY);
// };