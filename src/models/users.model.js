const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: { 
        type: String,
        required: true, 
        enum: ['donante', 'banco'], 
    },
    location: { 
        type: String,
        required: true, 
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;


