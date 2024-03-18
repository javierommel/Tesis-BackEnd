const db = require('../models');

const Country = db.country;
const General = db.general
exports.getCountry = (req, res) => {
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
    res.status(500).json({ message: 'Error al recuperar países.' });
  }
};

exports.getContent = (req, res) => {
  try {
    General.findAll({
      attributes: ['titulo', 'contenido', 'imagen1', 'imagen2', 'imagen3', 'imagen4'],
      where: { id: 1 },
    }).then((result) => {
      res.send({ data: result, message: 'Consulta realizada correctamente!' });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar contenido.' });
  }
};

exports.updateContent = (req, res) => {
  try {
    General.findAll({
      attributes: ['titulo', 'contenido', 'imagen1', 'imagen2', 'imagen3', 'imagen4'],
      where: { id: 1 },
    }).then((result) => {
      res.send({ data: result, message: 'Consulta realizada correctamente!' });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar contenido.' });
  }
};