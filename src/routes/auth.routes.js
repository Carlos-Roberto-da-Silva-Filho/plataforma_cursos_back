// src/routes/AuthRoutes.js

const { Router } = require('express')
const UsuarioController = require('../controllers/usuario.controller') // O login está no UsuarioController

const router = Router()

// Rota para login de usuário
// POST /login
router.post('/', UsuarioController.login)

module.exports = router