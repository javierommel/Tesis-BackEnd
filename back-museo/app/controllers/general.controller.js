const db = require('../models');
const fs = require('fs');
const { sequelize } = db;
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
      attributes: ['titulo', 'contenido', 'nrocomentarios','imagen1', 'imagen2', 'imagen3', 'imagen4'],
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

exports.updateContent = async (req, res) => {
  let t;
  try {
    const imagen1 = req.files['imagen1'] ? req.files['imagen1'][0] : null;
    const imagen2 = req.files['imagen2'] ? req.files['imagen2'][0] : null;
    const imagen3 = req.files['imagen3'] ? req.files['imagen3'][0] : null;
    const imagen4 = req.files['imagen4'] ? req.files['imagen4'][0] : null;

    const imagen11 = imagen1 ? fs.readFileSync(imagen1.path) : null;
    const imagen12 = imagen2 ? fs.readFileSync(imagen2.path) : null;
    const imagen13 = imagen3 ? fs.readFileSync(imagen3.path) : null;
    const imagen14 = imagen4 ? fs.readFileSync(imagen4.path) : null;

    const {
      usuario_modificacion,
    } = req.body;
    const data = JSON.parse(req.body.data);
    t = await sequelize.transaction();
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.id = 1;
    datosAActualizar.titulo = data.titulo;
    datosAActualizar.contenido = data.contenido;
    datosAActualizar.nrocomentarios = data.nrocomentarios;
    if(imagen1) datosAActualizar.imagen1 = imagen11;
    if(imagen2) datosAActualizar.imagen2 = imagen12;
    if(imagen3) datosAActualizar.imagen3 = imagen13;
    if(imagen4) datosAActualizar.imagen4 = imagen14;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    // Actualiza el Pieza
    const [numFilasAfectadas] = await General.update(
      datosAActualizar,
      { where: { id: 1 }, transaction: t },
    );
    if (imagen1) fs.unlinkSync(imagen1.path);
    if (imagen2) fs.unlinkSync(imagen2.path);
    if (imagen3) fs.unlinkSync(imagen3.path);
    if (imagen4) fs.unlinkSync(imagen4.path);
    if (numFilasAfectadas > 0) {
      await t.commit();
      res.send({ message: 'Datos generales modificados correctamente!' });
    } else {
      await t.rollback();
      res.status(404).send({ message: 'Datos generales no encontrados para modificación.' });
    }
  } catch (err) {
    console.error(err.stack);
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al modificar datos generales.' });
  }
};