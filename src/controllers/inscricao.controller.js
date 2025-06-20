// src/controllers/inscricao.controller.js

const InscricaoService = require('../services/inscricao.service') // Importa o serviço de inscrições

const InscricaoController = {
    /**
     * Lida com a requisição POST para inscrever um usuário em um curso.
     * Espera o ID do curso nos parâmetros da URL e o ID do usuário no req.user (do middleware de autenticação).
     * @param {Object} req - O objeto de requisição do Express (req.user.id e req.params.idCurso).
     * @param {Object} res - O objeto de resposta do Express.
     */
    async inscrever(req, res) {
        try {
            // Obtém o ID do usuário logado a partir do token (decodificado pelo authMiddleware)
            const usuarioId = req.user.id
            // Obtém o ID do curso dos parâmetros da URL
            const cursoId = req.params.idCurso // Por exemplo: /cursos/123 -> idCurso = 123

            // Validação básica se os IDs existem
            if (!usuarioId || !cursoId) {
                return res.status(400).json({ mensagem: 'ID de usuário ou curso ausente.' })
            }

            // Chama o método inscrever do serviço
            const novaInscricao = await InscricaoService.inscrever(usuarioId, cursoId)

            res.status(200).json({ mensagem: 'Inscrição realizada com sucesso!', inscricao: novaInscricao })
        } catch (error) {
            // Captura erros lançados pelo serviço (com status e mensagem customizados)
            console.error('Erro no InscricaoController.inscrever:', error)
            res.status(error.status || 500).json({
                mensagem: error.mensagem || 'Erro interno do servidor ao tentar se inscrever no curso.'
            })
        }
    },

    /**
     * Lida com a requisição PATCH para cancelar a inscrição de um usuário em um curso.
     * Espera o ID do curso nos parâmetros da URL e o ID do usuário no req.user.
     * @param {Object} req - O objeto de requisição do Express.
     * @param {Object} res - O objeto de resposta do Express.
     */
    async cancelar(req, res) {
        try {
            // Obtém o ID do usuário logado
            const usuarioId = req.user.id
            // Obtém o ID do curso dos parâmetros da URL
            const cursoId = req.params.idCurso

            if (!usuarioId || !cursoId) {
                return res.status(400).json({ mensagem: 'ID de usuário ou curso ausente.' })
            }

            // Chama o método cancelar do serviço
            const inscricaoCancelada = await InscricaoService.cancelar(usuarioId, cursoId)

            // Resposta de sucesso
            res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso!', inscricao: inscricaoCancelada })
        } catch (error) {
            // Captura erros lançados pelo serviço
            console.error('Erro no InscricaoController.cancelar:', error)
            res.status(error.status || 500).json({
                mensagem: error.mensagem || 'Erro interno do servidor ao tentar cancelar a inscrição.'
            })
        }
    }
}

module.exports = InscricaoController