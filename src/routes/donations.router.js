const express = require('express');
const router = express.Router();
const Donation = require('../models/donations.model');
const createError = require('http-errors'); // Asegúrate de tener http-errors instalado

// Función para obtener todas las donaciones
async function getAllDonations() {
    try {
        // Obtener todas las donaciones de la base de datos
        const donations = await Donation.find();  // Dependiendo del modelo y base de datos, puedes agregar opciones como .populate() si es necesario
        
        if (!donations || donations.length === 0) {
            throw createError(404, 'No se encontraron donaciones');
        }

        return donations;  // Devuelve todas las donaciones encontradas
    } catch (error) {
        throw createError(500, 'Error al obtener las donaciones');
    }
}

// Endpoint para obtener todas las donaciones
router.get('/', async (req, res) => {
    try {
        const donations = await getAllDonations();
        res.status(200).json({
            success: true,
            data: donations
        });
    } catch (error) {
        console.error('Error al obtener las donaciones', error);
        res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Error al obtener las donaciones'
        });
    }
});

// Endpoint para crear una nueva donación
router.post('/', async (req, res) => {
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

    const newDonation = await Donation.create({
      food,
      quantity,
      type,
      expirationDate,
      donorName,
      donorContact,
      deliveryAddress,
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


