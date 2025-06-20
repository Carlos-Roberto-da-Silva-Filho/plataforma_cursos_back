// src/routes/usuario.routes.js

const { Router } = require('express')
const UsuarioController = require('../controllers/usuario.controller')

const router = Router()

// Rota para cadastrar um novo usuário
// POST /usuarios
router.post('/', UsuarioController.cadastrar)

module.exports = router