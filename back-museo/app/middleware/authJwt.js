const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(
    token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Usuario no autorizado!',
        });
      }
      req.userId = decoded.id;
      next();
      return true;
    },
  );
  return true;
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Se requiere rol de administrador!',
      });
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === 'manager') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Se requiere rol de superusuario!',
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }

        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Se requiere rol de usuario!',
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt;
