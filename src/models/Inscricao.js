const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

const Inscricao = sequelize.define('Inscricao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_cancelamento: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    data_inscricao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Simula CURRENT_TIMESTAMP
    },
    // Adicionando explicitamente as chaves estrangeiras como colunas
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Garante NOT NULL no banco de dados
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Garante NOT NULL no banco de dados
    }
}, {
    tableName: 'inscricoes',
    timestamps: false,
    // --- ADIÇÃO DA CHAVE COMPOSTA ---
    indexes: [
        {
            unique: true,
            fields: ['usuario_id', 'curso_id'] // Nome das colunas que formam a chave composta
        }
    ]
})

module.exports = Inscricao