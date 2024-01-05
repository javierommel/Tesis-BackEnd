const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8), 
      fnacimiento: req.body.fnacimiento,
      estado: 1,
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
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
          user.setRoles([1]).then(() => {
            res.send({ message: "Usuario registrado correctamente!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.signin = (req, res) => {
    User.findOne({
      where: {
        email: req.body.username,
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
        var roles_usuario= [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
            roles_usuarios.push(roles[i].id);

          }
          res.status(200).send({
            id: user.id,
            name: user.name,
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