const db = require("../models");
const { Op } = require('sequelize');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { usuario: req.body.user }
        ]
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! Usuario o Email ya está en uso!"
        });
        return;
      }
      next();
    });
  };
  
  
  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Error! Rol no exite = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;