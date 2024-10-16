const express = require('express');
const createError = require('http-errors');
const userUseCase = require('../usecases/users.usecase');
const auth = require('../middleware/auth.middleware'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await userUseCase.getAll();
    res.json({
      success: true,
      data: { users },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await userUseCase.getByEmail(email);
    if (existingUser) {
      throw createError(400, 'El correo electrónico ya está en uso');
    }

   
    if (!name || !email || !password || !phone) {
      throw createError(400, 'Faltan campos requeridos (name, email, password, phone)');
    }

   
    const userCreated = await userUseCase.create({ name, email, password, phone });
    res.status(201).json({
      success: true,
      data: { user: userCreated },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userUseCase.getById(id);
    if (!user) {
      throw createError(404, 'Usuario no encontrado');
    }
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;

