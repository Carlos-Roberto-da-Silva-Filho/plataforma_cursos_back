const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()


const PORT = 3000
const hostname = 'localhost'

// const CursoRoutes = require('./src/routes/cursoRoutes')

const UsuarioRoutes = require('./src/routes/usuario.routes')
const AuthRoutes = require('./src/routes/auth.routes')

// -------------- config middlewares --------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// ------------------------------------------------

// app.use('/cursos', CursoRoutes)

app.use('/usuarios', UsuarioRoutes)
app.use('/login', AuthRoutes)



app.listen(PORT, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${PORT}`)
})



