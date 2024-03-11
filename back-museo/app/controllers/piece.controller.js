const db = require('../models');

const Piece = db.piece;
const Type = db.type;
const Deterioration=db.deterioration_option;
const Material=db.material;
const Stateintegrity=db.state_integrity;
const State=db.state;
const Technique=db.technique;

exports.getPiece = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;
    Piece.findAll({
      attributes: ['numero_ordinal', 'codigo_inpc', 'nombre', 'tipo_bien', 'autor', 'estado'],
      limit: pageSize,
      offset,
    })
      .then((piece) => {
        Type.findAll({
          attributes: ['id', 'nombre'],
        }).then((type) => {
          res.send({ tipo: type, data: piece, message: 'Consulta realizada correctamente!' });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar objetos.' });
  }
};

exports.getInformationPieces = async(req, res) => {
  try {
    const type=await Type.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const deterioration=await Deterioration.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const material=await Material.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const integrity=await Stateintegrity.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const state=await State.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const technique=await Technique.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    res.send({ data: {type, deterioration, material, integrity, state, technique}, message: 'Datos consultados correctamente!' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al consultar informacion.' });
  }
};