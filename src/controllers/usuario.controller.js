// src/controllers/UsuarioController.js

const UsuarioService = require('../services/usuario.service')

const UsuarioController = {
    async cadastrar(req, res) {
        try {
            const resultado = await UsuarioService.cadastrar(req.body)
            res.status(200).json(resultado)
        } catch (error) {
            res.status(error.status || 500).json({ mensagem: error.mensagem || 'Erro interno do servidor ao cadastrar usuário.' })
        }
    },

    async listar(req, res) {
        try {
            const usuarios = await UsuarioService.listar()
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(error.status || 500).json({ mensagem: error.mensagem || 'Erro interno do servidor ao listar usuários.' })
        }
    },

    async login(req, res) {
        try {
            const token = await UsuarioService.login(req.body)

            res.cookie('token', token, {
                httpOnly: true,
            })

            res.status(200).json(token) // Retornar o token para o frontend
        } catch (error) {
            res.status(error.status || 500).json({ mensagem: error.mensagem || 'Erro interno do servidor ao realizar login.' })
        }
    }
}

module.exports = UsuarioController