// src/controllers/UsuarioController.js

const UsuarioService = require('../services/usuario.service')

const UsuarioController = {
    async cadastrar(req, res) {
        try {
            const resultado = await UsuarioService.cadastrar(req.body)
            res.status(200).json(resultado)
        } catch (error) {
            res.status(error.status || 500).json({ mensagem: error.mensagem || 'Erro interno do servidor' })
        }
    },
    
    // ... (método listar verificar se vai ser aqui)

    async login(req, res){ 
        try {
            const token = await UsuarioService.login(req.body)

            res.cookie('token', token, {
                httpOnly: true,
            })

            res.status(200).json({ token: token }) // Retornar o token também no corpo da resposta para o frontend
        } catch (error) {
            res.status(error.status || 500).json({ mensagem: error.mensagem || 'Erro interno do servidor' });
        }
    }
}

module.exports = UsuarioController