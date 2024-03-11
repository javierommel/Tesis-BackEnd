const db = require('../models');

const Piece = db.piece;
const Type = db.type;
const Deterioration = db.deterioration_option;
const Material = db.material;
const Stateintegrity = db.state_integrity;
const State = db.state;
const Technique = db.technique;

exports.getPiece = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;
    Piece.findAll({
      //attributes: ['numero_ordinal', 'codigo_inpc', 'nombre', 'tipo_bien', 'autor', 'estado'],
      limit: pageSize,
      offset,
      include: [{
        model: Material,
        through: 'piece_material',
        attributes: ['id', 'nombre'], // Selecciona solo el campo 'name' de la tabla 'role'
      },
      {
        model: Deterioration,
        through: 'piece_deterioration',
        attributes: ['id', 'nombre'], // Selecciona solo el campo 'name' de la tabla 'role'
      }],
    })
      .then((pieces) => {
        const pieceWithElements = pieces.map((piece) => {
          const materiales = piece.materiales.map((material) => material.id).join(', ');
          const deterioros = piece.opcion_deterioros.map((deterioro) => deterioro.id).join(', ');
          return {
            numero_ordinal: piece.numero_ordinal,
            numero_historico: piece.numero_historico,
            codigo_inpc: piece.codigo_inpc,
            tipo_bien: piece.tipo_bien,
            nombre: piece.nombre,
            otro_nombre: piece.otro_nombre,
            otros_material: piece.otros_material,
            tecnica: piece.tecnica,
            autor: piece.autor,
            siglo: piece.siglo,
            anio: piece.anio,
            alto: piece.alto,
            ancho: piece.ancho,
            diametro: piece.diametro,
            espesor: piece.espesor,
            peso: piece.peso,
            inscripcion: piece.inscripcion,
            descripcion: piece.descripcion,
            ubicacion: piece.ubicacion,
            regimen: piece.regimen,
            estado_piezas: piece.estado_piezas,
            otros_deterioro: piece.otros_deterioro,
            estado_integridad: piece.estado_integridad,
            conservacion: piece.conservacion,
            observacion: piece.observacion,
            publicidad: piece.publicidad,
            imagen1: piece.imagen1,
            imagen2: piece.imagen2,
            entidad_investigadora: piece.entidad_investigadora,
            registrado: piece.registrado,
            fecha_registro: piece.fecha_registro,
            revisado: piece.revisado,
            fecha_revision: piece.fecha_revision,
            registro_fotográfico: piece.registro_fotográfico,
            realiza_foto: piece.realiza_foto,
            estado: piece.estado,
            usuario_modificacion: piece.usuario_modificacion,
            materiales,
            deterioros
          };
        });
        Type.findAll({
          attributes: ['id', 'nombre'],
        }).then((type) => {
          res.send({ tipo: type, data: pieceWithElements, message: 'Consulta realizada correctamente!' });
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

exports.getInformationPieces = async (req, res) => {
  try {
    const type = await Type.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const deterioration = await Deterioration.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const material = await Material.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const integrity = await Stateintegrity.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const state = await State.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    const technique = await Technique.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    })
    res.send({ data: { type, deterioration, material, integrity, state, technique }, message: 'Datos consultados correctamente!' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al consultar informacion.' });
  }
};