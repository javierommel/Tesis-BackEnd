const db = require("../models");
const User = db.user;
const Role = db.role;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUser = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    User.findAll({
      attributes: ['usuario', 'nombre', 'email', 'password', 'fnacimiento', 'pais','estado'],
      limit: pageSize,
      offset: offset,
      include: {
        model: db.role,
        through: 'user_roles',
        attributes: ['id'], // Selecciona solo el campo 'name' de la tabla 'role'
      },
    }).then(users => {
      const usersWithRoles = users.map(user => {
        const roles = user.roles.map(role => role.id).join(', ');
        return {
          usuario: user.usuario,
          nombre: user.nombre,
          email: user.email,
          fnacimiento: user.fnacimiento,
          estado: user.estado,
          pais: user.pais,
          roles: roles,
        };
      });
      Role.findAll({
        attributes: ['id', 'nombre'],
        where: { estado: 1 }
      }).then(role => {
        res.send({ roles: role, data: usersWithRoles, message: "Consulta realizada correctamente!" });
      })

    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
  }
};

