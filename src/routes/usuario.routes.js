// src/routes/usuario.routes.js

const { Router } = require('express')
const UsuarioController = require('../controllers/usuario.controller')
const CursoController = require('../controllers/curso.controller')  
const authMiddleware = require('../middlewares/auth.middleware') 

const router = Router()

// Rota para cadastrar um novo usuário
// POST /usuarios
router.post('/', UsuarioController.cadastrar)

// Nova rota para listar os cursos inscritos por um usuário específico
// GET /usuarios/:idUsuario/cursos-inscritos
// Esta rota EXIGE AUTENTICAÇÃO e a validação no controller garante que o usuário só veja as suas próprias inscrições.
router.get('/:idUsuario/cursos-inscritos', authMiddleware, CursoController.listarCursosInscritos)


module.exports = router