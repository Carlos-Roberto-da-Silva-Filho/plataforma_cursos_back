// src/controllers/curso.controller.js

const CursoService = require('../services/curso.service') // Importa o serviço de cursos

const CursoController = {
    // Lida com a requisição GET para listar todos os cursos
    async listarCursos(req, res) {
        try {
            const filtro = req.query.filtro || null  // Pega o parâmetro 'filtro' da query string

            // O usuarioId virá do token, rota for protegida pelo authMiddleware. 
            const usuarioId = req.user.id

            // Chama o método listarCursos do serviço para obter os dados
            const cursos = await CursoService.listarCursos(usuarioId, filtro)
            
            // Envia a resposta com status 200 (OK) e os cursos em formato JSON
            res.status(200).json(cursos)
        } catch (error) {
            // Captura erros lançados pelo serviço ou outros erros inesperados
            console.error('Erro no CursoController.listarCursos:', error)
            
            // Usa error.status se disponível (do service), caso contrário, 500
            res.status(error.status || 500).json({ mensagem: "Erro ao buscar cursos: " + (error.mensagem || error.message) })

        }
    },

    // Lida com a requisição GET para listar cursos nos quais um usuário específico está inscrito.
    // A rota é protegida e verifica se o ID na URL corresponde ao usuário logado. 
    async listarCursosInscritos(req, res) { 
        try { 
            // ID do usuário logado (vem do token, via authMiddleware) 
            const usuarioLogado = req.user.id
            // ID do usuário solicitado na URL (ex: /usuarios/123/cursos-inscritos -> idUsuario = 123)
            const usuarioSolicitadoId = req.params.idUsuario

            // VERIFICAÇÃO DE AUTORIZAÇÃO: Impede que um usuário veja as inscrições de outro
            if (usuarioLogado != usuarioSolicitadoId) {
                return res.status(403).json({
                    mensagem: "Não autorizado a ver as inscrições de outro usuário!"
                })
            }

            // Chama o serviço para listar os cursos inscritos pelo usuário logado
            const cursosInscritos = await CursoService.listarCursosInscritos(usuarioLogado)
            return res.status(200).json(cursosInscritos)

        } catch (error) {
            console.error('Erro no CursoController.listarCursosInscritos:', error)
            return res.status(error.status || 500).json({ 
                mensagem: error.mensagem || "Erro interno do servidor ao buscar cursos inscritos."
            })
        }
    }

}

module.exports = CursoController