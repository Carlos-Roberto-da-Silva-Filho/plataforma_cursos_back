// src/routes/curso.routes.js

const { Router } = require('express') // Importa a classe Router do Express
const CursoController = require('../controllers/curso.controller') // Importa o controller de cursos
const InscricaoController = require('../controllers/inscricao.controller')
const authMiddleware = require('../middlewares/auth.middleware')


const router = Router() // Cria uma nova instância de Router

router.use(authMiddleware)

// Rota para listar todos os cursos
// GET /cursos
router.get('/', CursoController.listarCursos)

// Rota para inscrever um usuário em um curso (EXIGE AUTENTICAÇÃO)
// POST /cursos/:idCurso/inscrever
router.post('/:idCurso', InscricaoController.inscrever)

// Rota para cancelar a inscrição de um usuário em um curso (EXIGE AUTENTICAÇÃO)
// PATCH /cursos/:idCurso/cancelar
router.patch('/:idCurso', InscricaoController.cancelar)



module.exports = router