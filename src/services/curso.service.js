// src/services/curso.service.js

const Curso = require('../models/Curso')

const CursoService = {
    /**
     * Lista todos os cursos disponíveis no sistema.
     * @returns {Array} Uma lista de objetos de curso.
     */
    async listarCursos() {
        try {
            const cursos = await Curso.findAll() // Busca todos os cursos no banco de dados

            // Opcional: formatar a data de início para o frontend, se desejar
            return cursos.map(curso => ({
                id: curso.id,
                nome: curso.nome,
                descricao: curso.descricao,
                capa: curso.capa, // URL ou caminho da imagem da capa
                inicio: new Date(curso.inicio).toLocaleDateString('pt-BR') // Formata para DD/MM/YYYY
            }))
        } catch (error) {
            console.error('Erro ao listar cursos no service:', error)
            throw { status: 500, mensagem: 'Erro interno do servidor ao buscar cursos.' }
        }
    }
}

module.exports = CursoService