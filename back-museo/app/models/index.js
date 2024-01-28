const config=require('../config/db.config.js')

const {Sequelize,DataTypes} =require('sequelize')
const pgvector =require('pgvector/sequelize')
pgvector.registerType(Sequelize)
const sequelize = new Sequelize (
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max:config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)
const db ={}
db.Sequelize=Sequelize
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.piece = require("../models/piece.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.recomendation = require("../models/recomendation.model.js")(sequelize, Sequelize, DataTypes);
db.state = require("../models/state.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.visit = require("../models/visit.model.js")(sequelize, Sequelize);
db.material = require("../models/material.model.js")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.deterioration_option = require("../models/deterioration_option.model.js")(sequelize, Sequelize);
db.state_integrity = require("../models/state_integrity.model.js")(sequelize, Sequelize);
db.tecnique = require("../models/tecnique.model.js")(sequelize, Sequelize);

//Asociación usuario-roles
db.role.belongsToMany(db.user, {
  through: "usuario_roles",
  foreignKey: "rol",
  otherKey: "usuario",
  targetKey: "usuario",
  
});
db.user.belongsToMany(db.role, {
  through: "usuario_roles",
  foreignKey: "usuario",
  otherKey: "rol",
  targetKey: "id",
});
db.ROLES = ["user", "admin", "manager", "report"];

//Asociación comentarios-usuarios
db.comment.belongsTo(db.user, {
  foreignKey: 'usuario', 
  targetKey: 'usuario', 
  as: 'usuario_id', 
});

//Asociación usuarios-paises
db.user.belongsTo(db.country, {
  foreignKey: 'pais', 
  targetKey: 'id', 
});

//Asociación piezas-opciones_deterioros
db.piece.belongsToMany(db.deterioration_option, {
  through: "deterioro_piezas",
  foreignKey: "pieza", 
  otherKey: "deterioro", 
  targetKey: "id", 
});

//Asociación piezas-materiales
db.piece.belongsToMany(db.material, {
  through: "material_piezas",
  foreignKey: "pieza", 
  otherKey: "material", 
  targetKey: "id", 
});

//Asociación piezas-estadointegridad
db.piece.belongsTo(db.state_integrity, {
  foreignKey: 'estado_integridad', 
  targetKey: 'id',
  as: 'estado_deterioro_id' 
});

//Asociación piezas-estados
db.piece.belongsTo(db.state, {
  foreignKey: 'estado', 
  targetKey: 'id', 
});

//Asociación piezas-estados
db.piece.belongsTo(db.tecnique, {
  foreignKey: 'tecnica', 
  targetKey: 'id', 
  as: 'tecnica_id'
});

//Asociación piezas-estados
db.piece.belongsTo(db.type, {
  foreignKey: 'tipo', 
  targetKey: 'id', 
  as: 'tipo_id'
});
module.exports = db;

//Asociación visitas-usuarios
db.visit.belongsTo(db.user, {
  foreignKey: 'usuario', 
  targetKey: 'usuario', 
  as: 'usuario_id', 
});