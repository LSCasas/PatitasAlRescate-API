const User = require('../models/users.model');
const createError = require('http-errors');
const encrypt = require("../lib/encrypt");

async function create(data) {
    try {
        // Verificar si el correo ya está en uso
        const userFound = await User.findOne({ email: data.email });
        if (userFound) {
            throw createError(409, "Email already in use");
        }

        // Validar que la contraseña y otros campos sean proporcionados
        if (!data.password) {
            throw createError(400, "Password is required");
        }
        if (!data.type) {
            throw createError(400, "User type is required");
        }
        if (!data.location) {
            throw createError(400, "User location is required");
        }

        // Encriptar la contraseña
        try {
            data.password = await encrypt.encrypt(data.password);
        } catch (error) {
            console.error('Error encrypting password:', error);
            throw createError(500, "Encryption failed");
        }
        
        // Crear un nuevo usuario
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
    try {
        const user = await User.findById(id);
        if (!user) {
            throw createError(404, "User not found");
        }
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw createError(500, error.message || "Error fetching user by ID");
    }
}

async function getByEmail(email) {
    return User.findOne({ email });
}

// Nueva función para obtener usuarios por tipo
async function getByType(type) {
    try {
        const users = await User.find({ type });
        return users;
    } catch (error) {
        console.error('Error fetching users by type:', error);
        throw createError(500, "Error fetching users by type");
    }
}

module.exports = {
    create,
    getAll,
    getById,
    getByEmail,
    getByType,
};
