const User = require('./../models/userModel');

exports.createUser = async ({
    email,
    password,
    nameFirst,
    nameLast,
}) => {
    try {
        // Create a DB entry (a document)
        const userDocument = new User({
            email,
            password,
            nameFirst,
            nameLast,
        });

        // Saves the document to the DB
        await userDocument.save();

        // Returns the document
        return userDocument;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

exports.findUserById = async (id) => {
    try {
        const userDocument = await User.findById(id);

        if (!userDocument) {
            throw new Error('not found');
        }

        return userDocument;
    } catch (err) {
        console.error(err);
        throw err;
    }
}