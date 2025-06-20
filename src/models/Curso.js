const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')


const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    capa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'cursos',
    timestamps: false
})

module.exports = Curso