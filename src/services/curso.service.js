// src/services/curso.service.js

const Curso = require('../models/Curso')
const { Op } = require('sequelize')
const Inscricao = require('../models/Inscricao')
const sequelize = require('../../config/database')
const moment = require('moment')

const CursoService = {
    async listarCursos(usuarioId, filtro) {
        const whereClause = filtro ? {
            [Op.or]: [
                { nome: { [Op.like]: `%${filtro}%` } },
                { descricao: { [Op.like]: `%${filtro}%` } }
            ]
        } : {}

        const cursos = await Curso.findAll({
            where: whereClause,
            include: [
                {
                    model: Inscricao,
                    as: 'inscricoesCurso',
                    attributes: [],
                    required: false, // LEFT JOIN para incluir cursos mesmo sem inscrição
                    where: { usuario_id: usuarioId, data_cancelamento: null } // Filtra pela inscrição ATIVA do usuário logado
                }
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)'),
                        'total_inscricoes'
                    ],
                    [
                        sequelize.literal(`CASE WHEN EXISTS (SELECT 1 FROM inscricoes WHERE inscricoes.curso_id = 
                            Curso.id AND inscricoes.usuario_id = ${usuarioId} AND inscricoes.data_cancelamento IS NULL) 
                            THEN 1 ELSE 0 END`), 'usuario_inscrito'
                    ]
                ]
            }
        })

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.getDataValue('total_inscricoes'),
            inicio: moment(curso.inicio).format('DD/MM/YYYY'), // Formata a data de início
            inscrito: curso.getDataValue('usuario_inscrito') > 0 // Verifica se o usuário logado está inscrito
        }))
    },

    async listarCursosInscritos(usuarioId) {
        const cursos = await Curso.findAll({
            include: [{
                model: Inscricao,
                as: 'inscricoesCurso',
                where: {
                    usuario_id: usuarioId
                },
                required: true // INNER JOIN para pegar apenas cursos com inscrição
            }],
            attributes: {
                include: [
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)'),
                        'total_inscricoes'
                    ],
                    [
                        sequelize.literal('(inscricoesCurso.data_cancelamento IS NOT NULL)'),
                        'inscricao_cancelada'
                    ]
                ]
            }
        })

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.getDataValue('total_inscricoes'),
            inicio: moment(curso.inicio).format('DD/MM/YYYY'), // Formata a data de início
            inscricao_cancelada: curso.getDataValue('inscricao_cancelada') > 0,
            inscrito: true // Se está nesta lista, o usuário está inscrito
        }))
    }
}

module.exports = CursoService