const createError = require('http-errors');
const User = require('../models/users.model');
const jwt = require('../lib/jwt');
const bcrypt = require('../lib/encrypt')

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id, email: user.email });
    return token;
}

module.exports = { login };