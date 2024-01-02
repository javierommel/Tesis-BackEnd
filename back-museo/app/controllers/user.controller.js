const db = require("../models");
const User = db.user;
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
      attributes: ['id', 'name', 'email', 'password', 'fnacimiento'],
      limit: pageSize,
      offset: offset,
    })
      .then(user => {
        res.send({ data: user, message: "Consulta realizada correctamente!" });
      }
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
  }
};

