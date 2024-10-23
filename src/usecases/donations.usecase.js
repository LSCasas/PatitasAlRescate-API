const createError = require("http-errors");
const Donation = require('../models/donations.model');

async function createDonation(food, quantity, type, expirationDate, donorName, donorContact, deliveryAddress, userId) {
    try {
        const newDonation = await Donation.create({
            food,
            quantity,
            type,
            expirationDate,
            donorName,
            donorContact,
            deliveryAddress,
            user: userId
        });
        return newDonation; 
    } catch (error) {
        throw createError(500, 'Error al crear la donación');
    }
}

module.exports = {
    createDonation
};


