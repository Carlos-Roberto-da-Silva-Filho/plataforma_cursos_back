// src/services/inscricao.service.js

const Inscricao = require('../models/Inscricao') // Modelo de Inscrição
const Curso = require('../models/Curso')       // Modelo de Curso (para verificar se o curso existe)
const sequelize = require('../../config/database') // Sua instância Sequelize (útil para queries diretas, se precisar)

const InscricaoService = {
    /**
     * Realiza a inscrição de um usuário em um curso.
     * @param {number} usuarioId - O ID do usuário logado.
     * @param {number} cursoId - O ID do curso no qual o usuário deseja se inscrever.
     * @returns {Object} A nova inscrição criada.
     * @throws {Object} Erro com status e mensagem.
     */
    async inscrever(usuarioId, cursoId) {
        try {
            // 1. Verificar se o curso existe
            const curso = await Curso.findByPk(cursoId)
            if (!curso) {
                // Lança um erro customizado que o controller pode entender
                throw { status: 404, mensagem: 'Curso não encontrado!' }
            }

            // 2. Verificar se o usuário já está inscrito e a inscrição não foi cancelada
            const inscricaoExistente = await Inscricao.findOne({
                where: {
                    usuario_id: usuarioId,
                    curso_id: cursoId,
                    data_cancelamento: null // Garante que a inscrição não está cancelada
                }
            })

            if (inscricaoExistente) {
                throw { status: 409, mensagem: 'Usuário já inscrito neste curso!' } // 409 Conflito
            }

            // 3. Criar a nova inscrição
            const novaInscricao = await Inscricao.create({
                usuario_id: usuarioId,
                curso_id: cursoId,
                data_inscricao: new Date(), // Define a data/hora atual da inscrição
                data_cancelamento: null     // Garante que não há data de cancelamento inicialmente
            })

            return novaInscricao // Retorna o objeto da inscrição criada

        } catch (error) {
            console.error('Erro ao inscrever usuário no curso:', error)
            // Re-lança o erro (se já for padronizado) ou lança um erro 500 genérico
            if (error.status && error.mensagem) {
                throw error // Propaga erros de validação/não encontrado
            }
            throw { status: 500, mensagem: 'Erro interno do servidor ao tentar se inscrever no curso.' }
        }
    },

    /**
     * Cancela a inscrição de um usuário em um curso.
     * @param {number} usuarioId - O ID do usuário logado.
     * @param {number} cursoId - O ID do curso para cancelar a inscrição.
     * @returns {Object} A inscrição atualizada (com data_cancelamento).
     * @throws {Object} Erro com status e mensagem.
     */
    async cancelar(usuarioId, cursoId) {
        try {
            // 1. Encontrar a inscrição ativa (não cancelada)
            const inscricao = await Inscricao.findOne({
                where: {
                    usuario_id: usuarioId,
                    curso_id: cursoId,
                    data_cancelamento: null // Apenas inscrições ativas podem ser canceladas
                }
            });

            if (!inscricao) {
                throw { status: 404, mensagem: 'Inscrição não encontrada ou já cancelada.' }
            }

            // 2. Atualizar a data_cancelamento
            inscricao.data_cancelamento = new Date()
            await inscricao.save() // Salva as mudanças no banco de dados

            return inscricao // Retorna a inscrição atualizada

        } catch (error) {
            console.error('Erro ao cancelar inscrição (Service):', error)
            if (error.status && error.mensagem) {
                throw error
            }
            throw { status: 500, mensagem: 'Erro interno do servidor ao tentar cancelar a inscrição.' }
        }
    }
};

module.exports = InscricaoService