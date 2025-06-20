const Usuario = require('./Usuario')
const Curso = require('./Curso')
const Inscricao = require('./Inscricao')

// Um Usuário pode ter muitas Inscrições
Usuario.hasMany(Inscricao, { 
    foreignKey: 'usuario_id', // Sequelize vai criar 'usuarioId' em Inscricao
    as: 'inscricoesUsuario', // Alias para a associação
    onDelete: 'CASCADE' // Se um usuário for deletado, suas inscrições também serão
})

// Uma Inscrição pertence a um Usuário
Inscricao.belongsTo(Usuario, { 
    foreignKey: 'usuario_id', 
    as: 'usuario',
    allowNull: false // Uma inscrição sempre deve ter um usuário associado
})

// Um Curso pode ter muitas Inscrições
Curso.hasMany(Inscricao, { 
    foreignKey: 'curso_id', // Sequelize vai criar 'cursoId' em Inscricao
    as: 'inscricoesCurso', // Alias para a associação
    onDelete: 'CASCADE' // Se um curso for deletado, suas inscrições também serão
})

// Uma Inscrição pertence a um Curso
Inscricao.belongsTo(Curso, { 
    foreignKey: 'curso_id', 
    as: 'curso',
    allowNull: false // Uma inscrição sempre deve ter um curso associado
})

// Exporta todos os modelos para garantir que sejam carregados e as associações sejam aplicadas
module.exports = { Usuario, Curso, Inscricao }