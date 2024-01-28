const db = require("../models");
const Piece = db.piece;
const Type=db.type;
exports.getPiece = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;
    Piece.findAll({
      attributes: ['numero_ordinal', 'codigo_inpc', 'nombre', 'tipo_bien', 'autor', 'estado'],
      limit: pageSize,
      offset: offset,
    })
      .then(piece => {
        Type.findAll({
          attributes: ['id','nombre']
        }).then(type=>{
          res.send({ tipo:type, data:piece, message: "Consulta realizada correctamente!" });
        })
        
      }
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al recuperar objetos.' });
    }
  };