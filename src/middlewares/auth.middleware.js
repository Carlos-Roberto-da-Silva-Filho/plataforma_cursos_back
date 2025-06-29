// src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken') // Importa a biblioteca jsonwebtoken
require('dotenv').config()         // Carrega as variáveis de ambiente (para acessar JWT_SECRET)

// Este é um middleware Express. Recebe req, res e next.
module.exports = (req, res, next) => {
    // 1. Obter o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization

    // 2. Verificar se o cabeçalho de autorização existe
    if (!authHeader) {
        // Se não houver token, retorna um erro 403 Forbidden (Proibido)
        return res.status(403).json({ mensagem: 'Token de autenticação não fornecido!' })
    }

    // 3. Extrair o token (formato esperado: "Bearer TOKEN_AQUI")
    // O split cria um array, ['Bearer', 'TOKEN_AQUI']
    const parts = authHeader.split(' ')
    
    // Verifica se o formato está correto (duas partes e a primeira é 'Bearer')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ mensagem: 'Formato do token inválido!' })
    }

    const token = parts[1] // Pega apenas o token - a segunda parte

    // 4. Verificar e decodificar o token JWT
    try {
        // Usa jwt.verify para validar o token com o segredo definido no seu arquivo .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Se o token for válido, anexar o payload decodificado ao objeto 'req.user'
        // Isso torna as informações do usuário (id, email) disponíveis para os controllers
        req.user = decoded

        // Chama next() para passar o controle para a próxima função de middleware ou rota
        next()

    } catch (error) {
        // Se a verificação falhar (token inválido, expirado, adulterado), retorna um erro 401 Unauthorized
        console.error('Erro de verificação do token:', error.message)
        return res.status(401).json({ mensagem: 'Token de autenticação inválido ou expirado!' })
    }
}