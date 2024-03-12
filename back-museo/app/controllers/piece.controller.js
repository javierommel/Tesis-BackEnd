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
exports.deletePiece = async (req, res) => {
  let t;

  try {
    const { id, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const pieceAntes = await Piece.findOne({ where: { id: id }, transaction: t });
    // Actualiza el usuario
    const [numFilasAfectadas] = await Piece.update(
      {
        usuario_modificacion,
        estado: 2,
      },
      { where: { id: id }, transaction: t },
    );
    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const pieceDespues = await Piece.findOne({ where: { usuario: id }, returning: true, transaction: t });
      // Crea el historial del usuario dentro de la transacción
      await PieceHistory.create({
        user_id: pieceDespues.usuario,
        tipo_accion: 'eliminacion',
        datos_antiguos: pieceAntes,
        datos_nuevos: pieceDespues.get(),
        usuario_modificacion,
      }, { transaction: t });
      // Confirma la transacción
      await t.commit();
      res.send({ message: 'Pieza de arte eliminada correctamente!' });
    } else {
      // Si no se actualizó ningún usuario, revierte la transacción
      await t.rollback();
      res.status(404).send({ message: 'Pieza de arte no encontrada para eliminación.' });
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al eliminar piezas de arte.' });
  }
};

exports.updatePiece = async (req, res) => {
  let t;
  try {
    const {
      id, data, roles, usuario_modificacion,
    } = req.body;
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const pieceAntes = await User.findOne({ where: { usuario: id }, transaction: t });
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.usuario = data.username;
    datosAActualizar.nombre = data.name;
    datosAActualizar.email = data.email;
    if (data.password !== '') datosAActualizar.password = bcrypt.hashSync(data.password, 8);
    datosAActualizar.pais = data.country;
    datosAActualizar.fnacimiento = data.year;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    // Actualiza el usuario
    const [numFilasAfectadas] = await User.update(
      datosAActualizar,
      { where: { usuario: id }, transaction: t },
    );

    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const pieceDespues = await Piece.findOne({ where: { usuario: id }, returning: true, transaction: t });
      // Elimina roles existentes y establece nuevos roles
      // Obtiene los roles actuales del usuario
      const rolesActuales = await pieceDespues.getRoles();
      // Elimina los roles actuales
      await pieceDespues.removeRoles(rolesActuales, { transaction: t });

      if (roles) {
        const rolesEncontrados = await Role.findAll({
          where: {
            nombre: {
              [Op.or]: roles,
            },
          },
          transaction: t,
        });
        await pieceDespues.setRoles(rolesEncontrados, { transaction: t });
      } else {
        await pieceDespues.setRoles([1], { transaction: t });
      }
      // Crea el historial del usuario dentro de la transacción
      await PieceHistory.create({
        user_id: pieceDespues.usuario,
        tipo_accion: 'modificación',
        datos_antiguos: pieceAntes,
        datos_nuevos: pieceDespues.get(),
        usuario_modificacion,
      }, { transaction: t });
      await t.commit();
      res.send({ message: 'Usuario modificado correctamente!' });
    } else {
      await t.rollback();
      res.status(404).send({ message: 'Usuario no encontrado para modificación.' });
    }
  } catch (err) {
    console.error(err.stack);
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al modificar usuarios.' });
  }
};