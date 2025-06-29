const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
require('./src/models/relacionamentos')


const PORT = 3000
const hostname = 'localhost'

const CursoRoutes = require('./src/routes/curso.routes')
const UsuarioRoutes = require('./src/routes/usuario.routes')
const AuthRoutes = require('./src/routes/auth.routes')
const RootRoutes = require('./src/routes/root.routes')

// -------------- config middlewares --------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    credentials: true, // Permite que cookies e headers de autorização sejam enviados
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}))

app.use('/images', express.static(path.join(__dirname, 'src', 'images')))
// ------------------------------------------------

// -------------- Definição das Rotas da API --------------
app.use('/cursos', CursoRoutes)
app.use('/usuarios', UsuarioRoutes)
app.use('/login', AuthRoutes)
app.use('/', RootRoutes)
// ------------------------------------------------


app.listen(PORT, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${PORT}`)
})



