// src/services/inscricao.service.js

const Inscricao = require('../models/Inscricao')
const Curso = require('../models/Curso')
const sequelize = require('../../config/database')
const moment = require('moment')

const InscricaoService = {
    async inscrever(usuarioId, cursoId) {
        try {
            const curso = await Curso.findByPk(cursoId)
            if (!curso) {
                throw { status: 404, mensagem: 'Curso não encontrado!' }
            }

            // Verifica se o usuário já tem uma inscrição ATIVA para este curso
            const existente = await Inscricao.findOne({
                where: {
                    usuario_id: usuarioId,
                    curso_id: cursoId,
                    data_cancelamento: null // Procura por uma inscrição ATIVA
                }
            })

            if (existente) {
                throw { status: 400, mensagem: 'Usuário já inscrito neste curso!' } // Lançar com status
            }

            const novaInscricao = await Inscricao.create({
                usuario_id: usuarioId,
                curso_id: cursoId,
                data_inscricao: moment().toDate(), // Usa moment para garantir um objeto Date
                data_cancelamento: null
            })

            return novaInscricao

        } catch (error) {
            // Propaga o erro com status se já tiver, senão lança 400 genérico
            if (error.status) {
                throw error
            }
            throw { status: 400, mensagem: error.message }
        }
    },

    async cancelar(usuarioId, cursoId) {
        try {
            // Encontra a inscrição ATIVA do usuário para o curso
            const inscricao = await Inscricao.findOne({
                where: {
                    usuario_id: usuarioId,
                    curso_id: cursoId,
                    data_cancelamento: null // Apenas inscrições ATIVAS podem ser canceladas
                }
            })

            if (!inscricao) {
                throw { status: 404, mensagem: 'Inscrição não encontrada ou já cancelada.' }
            }

            // Atualiza a data_cancelamento (comportamento PATCH)
            inscricao.data_cancelamento = moment().toDate()
            await inscricao.save() // Salva a alteração no banco

            // Retorna a inscrição atualizada
            return {
                id: inscricao.id,
                usuario_id: inscricao.usuario_id,
                curso_id: inscricao.curso_id,
                data_inscricao: moment(inscricao.data_inscricao).format('DD/MM/YYYY HH:mm:ss'),
                data_cancelamento: moment(inscricao.data_cancelamento).format('DD/MM/YYYY HH:mm:ss')
            }

        } catch (error) {
            // Propaga o erro com status se já tiver, senão lança 400 genérico
            if (error.status) {
                throw error
            }
            throw { status: 400, mensagem: error.message }
        }
    }
}

module.exports = InscricaoService