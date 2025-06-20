// src/controllers/curso.controller.js

const CursoService = require('../services/curso.service') // Importa o serviço de cursos

const CursoController = {
    /**
     * Lida com a requisição GET para listar todos os cursos.
     * @param {Object} req - O objeto de requisição do Express.
     * @param {Object} res - O objeto de resposta do Express.
     */
    async listarCursos(req, res) {
        try {
            // Chama o método listarCursos do serviço para obter os dados
            const cursos = await CursoService.listarCursos()
            
            // Envia a resposta com status 200 (OK) e os cursos em formato JSON
            res.status(200).json(cursos)
        } catch (error) {
            // Captura erros lançados pelo serviço ou outros erros inesperados
            console.error('Erro no CursoController.listarCursos:', error)
            
            // Usa error.status se disponível (do service), caso contrário, 500
            res.status(error.status || 500).json({ 
                mensagem: error.mensagem || 'Erro interno do servidor ao processar a requisição.' 
            })
        }
    }
    // Outros métodos para cursos - fazer aqui
}

module.exports = CursoController