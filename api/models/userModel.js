const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Build model
const userSchema = new Schema({
    nameFirst: {
        type: String,
        required: true,
    },
    nameLast: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Middleware for password encryption prior to database storage
userSchema.pre('save', async function(next) {
    const user = this;

    try {
        if (user.isModified('password') || user.isNew) {
            const encrypedPassword = await bcrypt.hash(user.password, 10);
            user.password = encrypedPassword;
        }
        next();

    } catch(err) {
        next(err);
    }
});

// Custom method for schema - compare password with encrypted database password
userSchema.methods.comparePasswords = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

// Exports the model
module.exports = mongoose.model('User', userSchema);