// src/routes/curso.routes.js

const { Router } = require('express') // Importa a classe Router do Express
const CursoController = require('../controllers/curso.controller') // Importa o controller de cursos

const router = Router() // Cria uma nova instância de Router

// Rota para listar todos os cursos
// GET /cursos
router.get('/', CursoController.listarCursos)

// Futuras rotas aqui 


module.exports = router