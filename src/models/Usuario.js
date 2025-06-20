const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    criado_em: {
        type: DataTypes.DATE, // Tipo DATE para TIMESTAMP
        defaultValue: DataTypes.NOW, // Simula CURRENT_TIMESTAMP
        allowNull: false 
    }
},{
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario