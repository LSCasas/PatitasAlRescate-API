const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Donation = require('../models/donations.model');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      food,
      quantity,
      type,
      expirationDate,
      donorName,
      donorContact,
      deliveryAddress,
    } = req.body;

    const userId = req.user.id;

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

    res.status(201).json({
      success: true,
      data: newDonation
    });

  } catch (error) {
    console.error('Error al registrar la donación', error);
    res.status(500).json({
      success: false,
      error: 'Error al registrar la donación'
    });
  }
});

module.exports = router;




