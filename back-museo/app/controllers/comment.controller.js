const db = require('../models');

const Comment = db.comment;
// const Role = db.role;
const User = db.user;
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
    const { page, pageSize, usuario } = req.body;

    const offset = (page - 1) * pageSize;

    Comment.findAll({
      attributes: ['id', 'usuario', 'comentario', 'puntuacion', 'fecha_registro', 'estado'],
      limit: pageSize,
      where: { estado: [0, 1] },
      offset,
    }).then((comments) => {
      const data = comments.length > 0 ? comments : null;
      res.send({ data, message: 'Consulta realizada correctamente!' });
    })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    console.error(err);
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
      usuario_modificacion: usuario,
    }, { transaction: t });

    await t.commit();
    res.send({ message: 'Comentario registrado correctamente!' });
  } catch (err) {
    console.error(err);
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al registrar el comentario.' });
  }
};
exports.getComment = (req, res) => {
  try {
    const { page, pageSize, usuario } = req.body;
    const offset = (page - 1) * pageSize;
    Comment.findAll({
      attributes: ['usuario', 'comentario', 'puntuacion', 'fecha_registro', 'estado'],
      where: {
        estado: [1],
      },
      offset,
      include: {
        model: User,
        attributes: ['nombre', 'avatar'],
        as: 'usuario_id',
      },
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
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
    res.status(500).send({ message: err.message || 'Error al eliminar comentario.' });
  }
};

exports.updateComment = async (req, res) => {
  let t;
  try {
    const { id, estado, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    Comment.update(
      {
        estado,
        usuario_modificacion,
      },
      { where: { id }, transaction: t },
    );

    await t.commit();
    res.send({ message: 'Comentario modificado correctamente!' });
  } catch (err) {
    console.error(err.stack);
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al modificar comentario.' });
  }
};
