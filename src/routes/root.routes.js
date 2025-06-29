// src/routes/RootRoutes.js

const { Router } = require('express')

const CursoController = require('../controllers/curso.controller') 
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()


router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "API está online!" })
})

// Rota para listar os cursos inscritos de um usuário
// O frontend chama GET http://localhost:3000/:idUsuario
router.get('/:idUsuario', authMiddleware, CursoController.listarCursosInscritos)

module.exports = router;