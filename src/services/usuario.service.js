// src/services/usuario.service.js

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const Usuario = require('../models/Usuario')

const UsuarioService = {
    async cadastrar({ nome, email, senha, nascimento }){
        const existe = await Usuario.findOne({
            where: { email }
        })
        if(existe){
            throw { status: 400, mensagem: 'Email já cadastrado' }
        }

        // Validando o formato da data
        const nascimentoDate = moment(nascimento, 'DD/MM/YYYY', true)
        if (!nascimentoDate.isValid()) {
            throw { status: 400, mensagem: 'Data de nascimento inválida. Use o formato DD/MM/YYYY' }
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const usuario = await Usuario.create({
            nome, 
            email, 
            senha: senhaHash,
            nascimento: nascimentoDate.format('YYYY-MM-DD') // Formato ISO - date string
        });

        const returnUsuario = {
            nome: usuario.nome,
            email: usuario.email,
            nascimento: nascimentoDate.format('DD/MM/YYYY') // formato desejado da data
        }

        return returnUsuario
    },

    // ... (método listar para verificar)

    async login({ email, senha }){
        const usuario = await Usuario.findOne({
            where: {email}
        })
        if(!usuario){
            throw { status: 401, mensagem: 'Email ou senha inválidos' }
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if(!senhaValida){
            throw { status: 401, mensagem: 'Email ou senha inválidos' }
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return token
    }
}

module.exports = UsuarioService