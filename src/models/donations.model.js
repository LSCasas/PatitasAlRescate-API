const mongoose = require('mongoose');
const modelName = "Donation";  
const donation = new mongoose.Schema({
    food: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, 
    },
    type: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    donorName: {
        type: String,
        required: true,
    },
    donorContact: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }
}, {
    timestamps: true, 
});

module.exports = mongoose.model(modelName, donation);
