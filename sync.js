const sequelize = require('./config/database')
const { Usuario, Curso, Inscricao } = require('./src/models/relacionamentos') // Carrega os modelos e as associações

async function syncDataBase() {
    try {
        // Sincroniza as tabelas e relacionamentos no banco de dados
        // { force: true } DROPPA as tabelas existentes e recria.

        await sequelize.sync({ force: true })
        console.log('Tabelas criadas e banco de dados sincronizado!')
    } catch (err) {
        console.error('Não foi possível sincronizar o Banco de dados: ', err)
    } finally {
        await sequelize.close() // Fecha a conexão após a sincronização
        console.log('Fechando a conexão com o banco de dados!')
    }
}

syncDataBase()