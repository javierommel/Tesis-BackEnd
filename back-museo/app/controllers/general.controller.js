const db = require('../models');

const Country = db.country;
exports.getcountry = (req, res) => {
  try {
    Country.findAll({
      attributes: ['id', 'nombre'],
      where: { estado: 1 },
    }).then((countries) => {
      res.send({ data: countries, message: 'Consulta realizada correctamente!' });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
  }
};
