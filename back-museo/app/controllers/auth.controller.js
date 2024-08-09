const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('../config/auth.config');
const mail = require('./mail.controller');
const { decrypt } = require('../utils/crypto');
const logger = require('../utils/logger');


const User = db.user;
const Visit = db.visit;
const UserHistory = db.userhistory;
const Role = db.role;
const { Op } = db.Sequelize;
const { sequelize } = db;

exports.signup = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    // Crea el usuario
    const user = await User.create({
      usuario: decrypt(req.body.user),
      nombre: decrypt(req.body.name),
      email: decrypt(req.body.email),
      password: bcrypt.hashSync(req.body.password, 8),
      fnacimiento: req.body.nacimiento,
      pais: req.body.pais,
      estado: req.body.estado ? req.body.estado : 3,
      usuario_modificacion: decrypt(req.body.usuario_modificacion),
    }, { transaction: t });
    // Asigna roles al usuario
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          nombre: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles, { transaction: t });
    } else {
      await user.setRoles([2], { transaction: t });
    }
    // Crea el historial del usuario dentro de la transacción
    await UserHistory.create({
      user_id: user.usuario,
      tipo_accion: 'creacion',
      datos_antiguos: null,
      datos_nuevos: null,
      usuario_modificacion: decrypt(req.body.usuario_modificacion),
      fecha_modificacion: new Date(),
    }, { transaction: t });
    const token = exports.createConfirmationToken(req.body.user);
    mail.sendMail(decrypt(req.body.email), token);
    await t.commit();

    res.send({ message: 'Usuario registrado correctamente, Por favor revise su correo y confirme su cuenta!' });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al registrar el usuario.' });
    logger.error('Error al registrar el usuario: ' + err.message);
    logger.error(err.stack);
  }
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        {
          usuario: decrypt(req.body.user),
        },
        {
          email: decrypt(req.body.user),
        },
      ],
      estado: 1,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario o Password incorrecto.' });
      }

      const passwordIsValid = req.body.google ? true : bcrypt.compareSync(
        decrypt(req.body.password),
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Usuario o Password incorrecto',
        });
      }

      const token = jwt.sign(
        { id: user.usuario },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 3600, // 24 hours
        },
      );

      const authorities = [];
      const rolesUsuario = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(`ROLE_${roles[i].nombre.toUpperCase()}`);
          rolesUsuario.push(roles[i].id);
        }
        //Guardar inicio de visita
        Visit.create({
          sesion: token,
          usuario: user.usuario,
          fecha_visita: new Date(),
          pregunta: '',
          tipo: 0,
        });

        res.status(200).send({
          id: user.usuario,
          name: user.nombre,
          email: user.email,
          roles: authorities,
          rolesUsuario,
          accessToken: token,
        });
      });
      return true;
    })
    .catch((err) => {
      logger.error('Error al ingresar al sistema: ' + err.message);
      logger.error(err.stack);
      res.status(500).send({ message: err.message });
    });
};

exports.createConfirmationToken = (userId) => {
  const token = jwt.sign(
    { userId },
    config.secret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    },
  );

  return token;
};

// Validar el JWT de confirmación
exports.verifyConfirmationToken = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, config.secret);
    if (decoded) {
      User.update(
        {
          usuario_modificacion: 'admin',
          estado: 1,
        },
        { where: { usuario: decoded.userId, estado: 3 } },
      ).then(() => {
        res.status(200).send({
          message: 'Se ha comprobado su cuenta. Por favor inicie sesión',
        });
      }).catch((e) => {
        logger.error('Error al confirmar cuenta: ' + e.message);
        logger.error(e.stack);
        res.status(500).send({ message: 'Error al verificar el token de confirmación' });

      });
    }
  } catch (error) {
    logger.error('Error al verificar el token de confirmación: ' + error.message);
    logger.error(error.stack);
    res.status(500).send({ message: 'Error al verificar el token de confirmación' });
  }
};
