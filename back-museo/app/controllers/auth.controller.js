const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserHistory = db.userhistory;
const Role = db.role;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    // Crea el usuario
    const user = await User.create({
      usuario: req.body.user,
      nombre: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      fnacimiento: req.body.nacimiento,
      pais: req.body.pais,
      estado: 1,
      usuario_modificacion: req.body.usuario_modificacion,
    }, { transaction: t });
    // Asigna roles al usuario
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          nombre: {
            [Op.or]: req.body.roles
          }
        }
      });
      await user.setRoles(roles, { transaction: t });
    } else {
      await user.setRoles([1], { transaction: t });
    }
    // Crea el historial del usuario dentro de la transacción
    await UserHistory.create({
      user_id: user.usuario,
      tipo_accion: 'creación',
      datos_antiguos: null,
      datos_nuevos: null,
      usuario_modificacion: req.body.usuario_modificacion
    }, { transaction: t });
    await t.commit();
    res.send({ message: "Usuario registrado correctamente!" });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || "Error al registrar el usuario." });
  }
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        {
          usuario: req.body.user
        },
        {
          email: req.body.user
        },
      ],
      estado: 1,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password incorrecto!"
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      var authorities = [];
      var roles_usuario = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nombre.toUpperCase());
          roles_usuario.push(roles[i].id);

        }
        res.status(200).send({
          id: user.usuario,
          name: user.nombre,
          email: user.email,
          fnacimiento: user.fnacimiento,
          roles: authorities,
          roles_usuario: roles_usuario,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};