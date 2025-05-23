const fs = require('fs');
const db = require('../models');

const Piece = db.piece;
const Type = db.type;
const Deterioration = db.deterioration;
const Material = db.material;
const Stateintegrity = db.stateIntegrity;
const State = db.state;
const Technique = db.technique;
const PieceHistory = db.piecehistory;
const { sequelize } = db;
const { Op } = db.Sequelize;
const logger = require('../utils/logger');

exports.getPiece = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;
    Piece.findAll({
      // attributes: ['numero_ordinal', 'codigo_inpc', 'nombre', 'tipo_bien', 'autor', 'estado'],
      where: {
        estado: [0, 1],
      },
      order: [
        ['numero_ordinal', 'ASC'],
      ],
      limit: pageSize,
      offset,
      include: [
        {
          model: Type,
          as: 'tipo_id',
          attributes: ['id', 'nombre'], // Selecciona los atributos necesarios del modelo Type
        },
        {
          model: Material,
          through: 'piece_material',
          attributes: ['id', 'nombre'],
        },
        {
          model: Deterioration,
          through: 'piece_deterioration',
          attributes: ['id', 'nombre'],
        },
      ],
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
            tipo_biens: piece.tipo_id?.nombre,
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
            deterioros,
          };
        });
        Piece.count({
          where: {
            estado: [0, 1],
          },
        }).then((count) => {
          const totalPages = Math.ceil(count / pageSize); // Número total de páginas

          // Lógica para determinar la página siguiente y anterior
          const nextPage = page < totalPages ? page + 1 : null;
          const prevPage = page > 1 ? page - 1 : null;
          res.send({
            currentPage: page, totalPages, nextPage, prevPage, total: count, data: pieceWithElements, message: 'Consulta realizada correctamente!',
          });
        });
      })
      .catch((err) => {
        logger.error(err.stack);
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    logger.error('Error al recuperar objetos: ' + err.message);
    logger.error(err.stack);
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
    });
    const deterioration = await Deterioration.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    });
    const material = await Material.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    });
    const integrity = await Stateintegrity.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    });
    const state = await State.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    });
    const technique = await Technique.findAll({
      attributes: ['id', 'nombre'],
      where: {
        estado: [1],
      },
    });
    res.send({
      data: {
        type, deterioration, material, integrity, state, technique,
      },
      message: 'Datos consultados correctamente!',
    });
  } catch (err) {
    logger.error('Error al consultar informacion: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al consultar informacion.' });
  }
};
exports.deletePiece = async (req, res) => {
  let t;

  try {
    const { id, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    // Busca la pieza antes de la actualización
    const pieceAntes = await Piece.findOne({ where: { numero_ordinal: id }, transaction: t });
    // Actualiza la pieza
    const [numFilasAfectadas] = await Piece.update(
      {
        usuario_modificacion,
        estado: 2,
      },
      { where: { numero_ordinal: id }, transaction: t },
    );
    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const pieceDespues = await Piece.findOne({
        where: { numero_ordinal: id },
        returning: true,
        transaction: t,
      });
      // Crea el historial de la pieza dentro de la transacción
      await PieceHistory.create({
        piece_id: pieceDespues.numero_ordinal,
        tipo_accion: 'eliminacion',
        datos_antiguos: pieceAntes,
        datos_nuevos: pieceDespues.get(),
        usuario_modificacion,
        fecha_modificacion: new Date(),
      }, { transaction: t });
      // Confirma la transacción
      await t.commit();
      res.send({ message: 'Pieza de arte eliminada correctamente!' });
    } else {
      // Si no se actualizó ninguna pieza, revierte la transacción
      await t.rollback();
      logger.info('Pieza de arte no encontrada para eliminación');
      res.status(404).send({ message: 'Pieza de arte no encontrada para eliminación.' });
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al eliminar piezas de arte: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al eliminar piezas de arte.' });
  }
};

exports.updatePiece = async (req, res) => {
  let t;
  try {
    const imagen1 = req.files.imagen1 ? req.files.imagen1[0] : null;
    const imagen2 = req.files.imagen2 ? req.files.imagen2[0] : null;

    const imagen11 = imagen1 ? fs.readFileSync(imagen1.path) : null;
    const imagen12 = imagen2 ? fs.readFileSync(imagen2.path) : null;

    const {
      id, materiales, deterioros, usuario_modificacion,
    } = req.body;
    const materialesArray = JSON.parse(materiales);
    const deteriorosArray = JSON.parse(deterioros);
    const data = JSON.parse(req.body.data);
    t = await sequelize.transaction();
    // Busca el pieza antes de la actualización
    const pieceAntes = await Piece.findOne({ where: { numero_ordinal: id }, transaction: t });
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.numero_ordinal = data.numero_ordinal;
    datosAActualizar.numero_historico = data.numero_historico;
    datosAActualizar.codigo_inpc = data.codigo_inpc;
    datosAActualizar.tipo_bien = data.tipo_bien;
    datosAActualizar.nombre = data.nombre;
    datosAActualizar.otro_nombre = data.otro_nombre;
    datosAActualizar.otros_material = data.otros_material;
    datosAActualizar.tecnica = data.tecnica;
    datosAActualizar.autor = data.autor;
    datosAActualizar.siglo = data.siglo;
    datosAActualizar.anio = data.anio;
    datosAActualizar.alto = data.alto;
    datosAActualizar.ancho = data.ancho;
    datosAActualizar.diametro = data.diametro;
    datosAActualizar.espesor = data.espesor;
    datosAActualizar.peso = data.peso;
    datosAActualizar.inscripcion = data.inscripcion;
    datosAActualizar.descripcion = data.descripcion;
    datosAActualizar.ubicacion = data.ubicacion;
    datosAActualizar.regimen = data.regimen;
    datosAActualizar.estado_piezas = data.estado_piezas;
    datosAActualizar.otros_deterioro = data.otros_deterioro;
    datosAActualizar.estado_integridad = data.estado_integridad;
    datosAActualizar.conservacion = data.conservacion;
    datosAActualizar.observacion = data.observacion;
    datosAActualizar.publicidad = data.publicidad;
    datosAActualizar.imagen1 = imagen11;
    datosAActualizar.imagen2 = imagen12;
    datosAActualizar.imagen2 = data.imagen2;
    datosAActualizar.entidad_investigadora = data.entidad_investigadora;
    datosAActualizar.registrado = data.registrado;
    datosAActualizar.fecha_registro = data.fecha_registro;
    datosAActualizar.revisado = data.revisado;
    datosAActualizar.fecha_revision = data.fecha_revision;
    datosAActualizar.registro_fotográfico = data.registro_fotográfico;
    datosAActualizar.realiza_foto = data.realiza_foto;
    datosAActualizar.estado = data.estado ? 1 : 0;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    // Actualiza el Pieza
    const [numFilasAfectadas] = await Piece.update(
      datosAActualizar,
      { where: { numero_ordinal: id }, transaction: t },
    );
    if (imagen1) fs.unlinkSync(imagen1.path);
    if (imagen2) fs.unlinkSync(imagen2.path);
    if (numFilasAfectadas > 0) {
      // Busca el pieza después de la actualización
      const pieceDespues = await Piece.findOne({
        where: { numero_ordinal: id },
        returning: true,
        transaction: t,
      });
      // Elimina roles existentes y establece nuevos roles
      // Obtiene los roles actuales del usuario
      const deteriorosActuales = await pieceDespues.getOpcion_deterioros();
      const materialesActuales = await pieceDespues.getMateriales();
      // Elimina los roles actuales
      await pieceDespues.removeMateriales(materialesActuales, { transaction: t });

      // Elimina los roles actuales
      await pieceDespues.removeOpcion_deterioros(deteriorosActuales, { transaction: t });

      if (materiales) {
        const materialesEncontrados = await Material.findAll({
          where: {
            nombre: {
              [Op.or]: materialesArray,
            },
          },
          transaction: t,
        });

        await pieceDespues.setMateriales(materialesEncontrados, { transaction: t });
      }

      if (deterioros) {
        const deteriorosEncontrados = await Deterioration.findAll({
          where: {
            nombre: {
              [Op.or]: deteriorosArray,
            },
          },
          transaction: t,
        });
        await pieceDespues.setOpcion_deterioros(deteriorosEncontrados, { transaction: t });
      }
      // Crea el historial del usuario dentro de la transacción
      await PieceHistory.create({
        piece_id: pieceDespues.numero_ordinal,
        tipo_accion: 'modificación',
        datos_antiguos: pieceAntes,
        datos_nuevos: pieceDespues.get(),
        usuario_modificacion,
        fecha_modificacion: new Date(),
      }, { transaction: t });
      await t.commit();
      res.send({ message: 'Pieza de arte modificada correctamente!' });
    } else {
      await t.rollback();
      logger.info('Pieza de arte no encontrado para modificación');
      res.status(404).send({ message: 'Pieza de arte no encontrado para modificación.' });
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al modificar piezas de arte: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al modificar piezas de arte.' });
  }
};
