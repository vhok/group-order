exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/group-order-app';
exports.PORT = process.env.PORT || '4000';
exports.TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || 'DEVELOPMENT_KEY';