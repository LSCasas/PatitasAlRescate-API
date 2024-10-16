const User = require('../models/users.model');
const createError = require('http-errors');
const encrypt = require("../lib/encrypt");

async function create(data) {
    try {
        const userFound = await User.findOne({ email: data.email });
        if (userFound) {
            throw createError(409, "Email already in use");
        }

        if (!data.password) {
            throw createError(400, "Password is required");
        }

        
        try {
            data.password = await encrypt.encrypt(data.password);
        } catch (error) {
            console.error('Error encrypting password:', error);
            throw createError(500, "Encryption failed");
        }
        
        const newUser = await User.create(data);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error); 
        throw createError(500, error.message || "Server error");
    }
}

async function getAll() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);  
        throw createError(500, "Error fetching all users");
    }
}

async function getById(id) {
    return User.findById(id);
}

async function getByEmail(email) {
    return User.findOne({ email });
}

module.exports = {
    create,
    getAll,
    getById,
    getByEmail
};