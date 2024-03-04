const { Sequelize, DataTypes } = require('sequelize');
const pgvector = require('pgvector/sequelize');
const config = require('../config/db.config');

pgvector.registerType(Sequelize);
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  },
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.userhistory = require('./userhistory.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.piece = require('./piece.model')(sequelize, Sequelize);
db.comment = require('./comment.model')(sequelize, Sequelize);
db.recomendation = require('./recomendation.model')(sequelize, Sequelize, DataTypes);
db.state = require('./state.model')(sequelize, Sequelize);
db.type = require('./type.model')(sequelize, Sequelize);
db.visit = require('./visit.model')(sequelize, Sequelize);
db.material = require('./material.model')(sequelize, Sequelize);
db.country = require('./country.model')(sequelize, Sequelize);
db.deterioration_option = require('./deterioration_option.model')(sequelize, Sequelize);
db.state_integrity = require('./state_integrity.model')(sequelize, Sequelize);
db.tecnique = require('./tecnique.model')(sequelize, Sequelize);

// Asociación usuario-roles
db.role.belongsToMany(db.user, {
  through: 'usuario_roles',
  foreignKey: 'rol',
  otherKey: 'usuario',
  targetKey: 'usuario',

});
db.user.belongsToMany(db.role, {
  through: 'usuario_roles',
  foreignKey: 'usuario',
  otherKey: 'rol',
  targetKey: 'id',
});
db.ROLES = ['user', 'admin', 'manager', 'report'];

// Asociación comentarios-usuarios
db.comment.belongsTo(db.user, {
  foreignKey: 'usuario',
  targetKey: 'usuario',
  as: 'usuario_id',
});

// Asociación usuarios-paises
db.user.belongsTo(db.country, {
  foreignKey: 'pais',
  targetKey: 'id',
});

// Asociación piezas-opciones_deterioros
db.piece.belongsToMany(db.deterioration_option, {
  through: 'deterioro_piezas',
  foreignKey: 'pieza',
  otherKey: 'deterioro',
  targetKey: 'id',
});

// Asociación piezas-materiales
db.piece.belongsToMany(db.material, {
  through: 'material_piezas',
  foreignKey: 'pieza',
  otherKey: 'material',
  targetKey: 'id',
});

// Asociación piezas-estadointegridad
db.piece.belongsTo(db.state_integrity, {
  foreignKey: 'estado_integridad',
  targetKey: 'id',
  as: 'estado_deterioro_id',
});

// Asociación piezas-estados
db.piece.belongsTo(db.state, {
  foreignKey: 'estado',
  targetKey: 'id',
});

// Asociación piezas-estados
db.piece.belongsTo(db.tecnique, {
  foreignKey: 'tecnica',
  targetKey: 'id',
  as: 'tecnica_id',
});

// Asociación piezas-estados
db.piece.belongsTo(db.type, {
  foreignKey: 'tipo',
  targetKey: 'id',
  as: 'tipo_id',
});

// Asociación visitas-usuarios
db.visit.belongsTo(db.user, {
  foreignKey: 'usuario',
  targetKey: 'usuario',
  as: 'usuario_id',
});

// Asociación piezas-estados
db.piece.belongsTo(db.user, {
  foreignKey: 'usuario_modificacion',
  targetKey: 'usuario',
  as: 'usuario',
});

// Asociación usuario-usuario_historial
db.user.hasMany(db.userhistory, {
  foreignKey: 'userId',
});

module.exports = db;
