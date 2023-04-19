// use the User model
const { User } = require('../models');


// verify if the email is already registered
const isEmailRegistered = async (email = '') => {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        throw new Error(`The email '${email} is already registered, use another`);
    }
}

module.exports = {
    isEmailRegistered
};