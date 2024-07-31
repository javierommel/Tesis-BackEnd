const db = require('../models');

const Comment = db.comment;
const General = db.general;
const User = db.user;
const Visit = db.visit;
const { sequelize } = db;
// const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

exports.getCommentList = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    Comment.findAll({
      attributes: ['id', 'usuario', 'comentario', 'puntuacion', 'fecha_registro', 'estado', 'destacado'],
      limit: pageSize,
      where: { estado: [0, 1] },
      offset,
      order: [
        ['fecha_registro', 'DESC'],
      ],
    }).then((comments) => {
      const data = comments.length > 0 ? comments : null;
      Comment.count({
        where: {
          estado: [0, 1],
        },
      }).then((count) => {
        const totalPages = Math.ceil(count / pageSize); // Número total de páginas

        logger.info('Número total de páginas:'+ totalPages);

        // Lógica para determinar la página siguiente y anterior
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        res.send({
          currentPage: page, totalPages, nextPage, prevPage, total: count, data, message: 'Consulta realizada correctamente!',
        });
      });
    })
      .catch((err) => {
        logger.error('Error consulta comentarios: ' + err.message);
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    logger.error('Error al recuperar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).json({ message: 'Error al recuperar comentarios.' });
  }
};
exports.addComment = async (req, res) => {
  let t;
  try {
    const { comentario, puntuacion, usuario } = req.body;
    t = await sequelize.transaction();
    // Crea el comentario
    await Comment.create({
      usuario,
      comentario,
      puntuacion,
      fecha_registro: new Date().getTime(),
      estado: 1,
      destacado: 0,
      usuario_modificacion: usuario,
    }, { transaction: t });

    await t.commit();
    res.send({ message: 'Comentario registrado correctamente!' });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al registrar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al registrar el comentario.' });
  }
};
exports.getComment = async (req, res) => {
  try {
    const { usuario } = req.body;
    /*General.findAll({
      attributes: ['nrocomentarios'],
      where: { id: 1 },
    }).then((result) => {
      Comment.findAll({
        attributes: ['id', 'usuario', 'comentario', 'puntuacion', 'fecha_registro', 'estado'],
        where: {
          estado: [1],
        },
        limit: result[0].nrocomentarios,
        include: {
          model: User,
          attributes: ['nombre', 'avatar'],
          as: 'usuario_id',
        },
        order: [
          ['fecha_registro', 'DESC'],
        ],
      }).then((comments) => {
        const data = comments.length > 0 ? comments : null;
        User.findAll({
          attributes: ['avatar'],
          where: { usuario },
        }).then((user) => {
          const avatar = user.length > 0 ? user[0].avatar : null;
          res.send({ data, avatar, message: 'Consulta realizada correctamente!' });
        });
      })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });*/
    // Obtener nrocomentarios de la tabla General
    const generalResult = await General.findAll({
      attributes: ['nrocomentarios'],
      where: { id: 1 },
    });

    const nrocomentarios = generalResult[0].nrocomentarios;

    // Obtener comentarios de la tabla Comment
    const comments = await Comment.findAll({
      attributes: ['id', 'usuario', 'comentario', 'puntuacion', 'fecha_registro', 'estado', 'destacado'],
      where: {
        estado: [1],
      },
      limit: nrocomentarios,
      include: {
        model: User,
        attributes: ['nombre', 'avatar'],
        as: 'usuario_id',
      },
      order: [
        ['destacado', 'DESC'],
        ['fecha_registro', 'DESC'],
      ],
    });

    const data = comments.length > 0 ? comments : null;

    // Obtener avatar del usuario
    const user = await User.findAll({
      attributes: ['avatar'],
      where: { usuario: req.body.usuario }, // Asegúrate de que 'usuario' proviene de algún lugar, como req.body
    });

    const avatar = user.length > 0 ? user[0].avatar : null;
    const comment = await Comment.count({
      where: {
        usuario,
      }
    });
    const visit = await Visit.count({
      distinct: true,
      col: 'sesion',
      where: {
        usuario,
        tipo: 0
      }
    });
    const search = await Visit.count({
      where: {
        usuario,
        tipo: 1
      }
    });
    const recomendation = await Visit.count({
      where: {
        usuario,
        tipo: 2
      }
    });
    res.send({ data, comment, visit, search, recomendation, avatar, message: 'Consulta realizada correctamente!' });
  } catch (err) {
    logger.error('Error al recuperar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).json({ message: 'Error al recuperar comentarios.' });
  }
};
exports.deleteComment = async (req, res) => {
  let t;
  try {
    const { id, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    await Comment.update(
      {
        usuario_modificacion,
        estado: 2,
      },
      { where: { id }, transaction: t },
    );

    await t.commit();
    res.send({ message: 'Comentario eliminado correctamente!' });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al eliminar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al eliminar comentario.' });
  }
};

exports.updateComment = async (req, res) => {
  let t;
  try {
    const { id, estado, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    await Comment.update(
      {
        estado,
        usuario_modificacion,
      },
      { where: { id }, transaction: t },
    );

    await t.commit();
    res.send({ message: 'Comentario modificado correctamente!' });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al modificar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al modificar comentario.' });
  }
};

exports.favouriteComment = async (req, res) => {
  let t;
  try {
    const { id, usuario_modificacion, destacado } = req.body;
    t = await sequelize.transaction();
    await Comment.update(
      {
        usuario_modificacion,
        destacado,
      },
      { where: { id }, transaction: t },
    );

    await t.commit();
    res.send({ message: 'Comentario destacado correctamente!' });
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    logger.error('Error al destacar comentarios: ' + err.message);
    logger.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al destacar comentario.' });
  }
};
