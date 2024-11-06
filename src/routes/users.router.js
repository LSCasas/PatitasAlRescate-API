const express = require('express');
const createError = require('http-errors');
const userUseCase = require('../usecases/users.usecase');
const auth = require('../middleware/auth.middleware'); 

const router = express.Router();

// Obtener todos los usuarios
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

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone, type, location } = req.body;

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await userUseCase.getByEmail(email);
    if (existingUser) {
      throw createError(400, 'El correo electrónico ya está en uso');
    }

    // Validar campos requeridos
    if (!name || !email || !password || !phone || !type) {
      throw createError(400, 'Faltan campos requeridos (name, email, password, phone, type)');
    }

    // Validar que "location" sea requerido solo para el tipo "banco"
    if (type === "banco" && !location) {
      throw createError(400, 'El campo "location" es requerido para el tipo "banco"');
    }

    // Crear el usuario
    const userCreated = await userUseCase.create({ name, email, password, phone, type, location });
    res.status(201).json({
      success: true,
      data: { user: userCreated },
    });
  } catch (error) {
    res.status(error.status || 400).json({
      success: false,
      error: error.message,
    });
  }
});

// Obtener un usuario por ID
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

// Obtener usuarios por tipo
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const usersByType = await userUseCase.getByType(type);
    res.json({
      success: true,
      data: { users: usersByType },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;




