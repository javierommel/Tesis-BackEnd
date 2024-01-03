const config=require('../config/db.config.js')

const Sequelize =require('sequelize')

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
db.dimension = require("../models/dimension.model.js")(sequelize, Sequelize);
db.recomendation = require("../models/recomendation.model.js")(sequelize, Sequelize);
db.state = require("../models/state.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.visit = require("../models/visit.model.js")(sequelize, Sequelize);
db.material = require("../models/material.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;