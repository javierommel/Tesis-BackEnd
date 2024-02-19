const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  User.create({
    usuario: req.body.user,
    nombre: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    fnacimiento: req.body.nacimiento,
    pais: req.body.pais,
    estado: 1,
    usuario_modificacion: req.body.usuario_modificacion,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nombre: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario registrado correctamente!" });
          });
        });
      } else {
        // user role = 1
        console.log("por aquis")
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuario registrado correctamente!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
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