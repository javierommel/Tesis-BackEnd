const db = require('../models');

const User = db.user;
const Role = db.role;
const UserHistory = db.userhistory;
const { sequelize } = db;
const { Op } = db.Sequelize;
const fs = require('fs');
const bcrypt = require('bcryptjs');

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

exports.getUser = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    User.findAll({
      attributes: ['usuario', 'nombre', 'email', 'password', 'fnacimiento', 'pais', 'estado'],
      limit: pageSize,
      where: {
        estado: [0, 1], usuario: {
          [Op.ne]: 'admin',
        },
      },
      offset,
      limit: pageSize,
      order: [
        ['usuario', 'ASC'],
      ],
      include: {
        model: db.role,
        through: 'user_roles',
        attributes: ['id', 'nombre'], // Selecciona solo el campo 'name' de la tabla 'role'
      },
    }).then((users) => {
      const userscounts = users.rows; // Resultados de la página actual
      const usersWithRoles = users.map((user) => {
        const roles = user.roles.map((role) => role.id).join(', ');
        const rolesname = user.roles.map((role) => role.nombre).join(', ');
        return {
          usuario: user.usuario,
          nombre: user.nombre,
          email: user.email,
          fnacimiento: user.fnacimiento,
          estado: user.estado,
          pais: user.pais,
          roles,
          rolesname
        };
      });
      Role.findAll({
        attributes: ['id', 'nombre'],
        where: {
          estado: 1,
          id: {
            [Op.ne]: 1,
          },
        },
        order: [
          ['id', 'ASC'],
        ],
      }).then((role) => {
        User.count({
          where: {
            estado: [0, 1], usuario: {
              [Op.ne]: 'admin',
            },
          },
        }).then((count) => {

          const totalPages = Math.ceil(count / pageSize); // Número total de páginas

          console.log('Usuarios de la página actual:', users);
          console.log('Número total de páginas:', totalPages);

          // Lógica para determinar la página siguiente y anterior
          const nextPage = page < totalPages ? page + 1 : null;
          const prevPage = page > 1 ? page - 1 : null;
          res.send({ currentPage: page, totalPages: totalPages, nextPage: nextPage, prevPage: prevPage, total: count, roles: role, data: usersWithRoles, message: 'Consulta realizada correctamente!' });
        })

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

exports.deleteUser = async (req, res) => {
  let t;

  try {
    const { id, usuario_modificacion } = req.body;
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const userAntes = await User.findOne({ where: { usuario: id }, transaction: t });
    // Actualiza el usuario
    const [numFilasAfectadas] = await User.update(
      {
        usuario_modificacion,
        estado: 2,
      },
      { where: { usuario: id }, transaction: t },
    );
    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const userDespues = await User.findOne({ where: { usuario: id }, returning: true, transaction: t });
      // Crea el historial del usuario dentro de la transacción
      await UserHistory.create({
        user_id: userDespues.usuario,
        tipo_accion: 'eliminacion',
        datos_antiguos: userAntes,
        datos_nuevos: userDespues.get(),
        usuario_modificacion,
      }, { transaction: t });
      // Confirma la transacción
      await t.commit();
      res.send({ message: 'Usuario eliminado correctamente!' });
    } else {
      // Si no se actualizó ningún usuario, revierte la transacción
      await t.rollback();
      res.status(404).send({ message: 'Usuario no encontrado para eliminación.' });
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    console.error(err.stack);
    res.status(500).send({ message: err.message || 'Error al eliminar usuarios.' });
  }
};

exports.updateUser = async (req, res) => {
  let t;
  try {
    const {
      id, data, roles, usuario_modificacion,
    } = req.body;
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const userAntes = await User.findOne({ where: { usuario: id }, transaction: t });
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.usuario = data.username;
    datosAActualizar.nombre = data.name;
    datosAActualizar.email = data.email;
    if (data.password !== '') datosAActualizar.password = bcrypt.hashSync(data.password, 8);
    datosAActualizar.pais = data.country;
    datosAActualizar.fnacimiento = data.year;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    datosAActualizar.estado = data.estado ? 1 : 0;
    // Actualiza el usuario
    const [numFilasAfectadas] = await User.update(
      datosAActualizar,
      { where: { usuario: id }, transaction: t },
    );

    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const userDespues = await User.findOne({ where: { usuario: id }, returning: true, transaction: t });
      // Elimina roles existentes y establece nuevos roles
      // Obtiene los roles actuales del usuario
      if (roles) {
        const rolesActuales = await userDespues.getRoles();
        // Elimina los roles actuales
        await userDespues.removeRoles(rolesActuales, { transaction: t });
        const rolesEncontrados = await Role.findAll({
          where: {
            nombre: {
              [Op.or]: roles,
            },
          },
          transaction: t,
        });
        await userDespues.setRoles(rolesEncontrados, { transaction: t });
      }
      // Crea el historial del usuario dentro de la transacción
      await UserHistory.create({
        user_id: userDespues.usuario,
        tipo_accion: 'modificación',
        datos_antiguos: userAntes,
        datos_nuevos: userDespues.get(),
        usuario_modificacion,
        fecha_modificacion: new Date(),
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

exports.getUserId = (req, res) => {
  try {
    const { usuario } = req.body;
    User.findAll({
      attributes: ['usuario', 'nombre', 'email', 'password', 'fnacimiento', 'pais', 'estado', 'avatar'],
      where: {
        usuario,
        estado: [1],
      },
    }).then((user) => {
      // console.log("user" + JSON.stringify(user))
      const data = user.length > 0 ? {
        usuario: user[0].usuario,
        nombre: user[0].nombre,
        email: user[0].email,
        fnacimiento: user[0].fnacimiento,
        estado: user[0].estado,
        pais: user[0].pais,
        avatar: user[0].avatar,
      } : null;
      res.send({ data, message: 'Consulta realizada correctamente!' });
    })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
  }
};

exports.updateUserProfile = async (req, res) => {
  let t;
  try {
    const { id, usuario_modificacion } = req.body;
    const data = JSON.parse(req.body.data);
    const { path } = req.file;

    const image = fs.readFileSync(path);
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const userAntes = await User.findOne({ where: { usuario: id }, transaction: t });
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.usuario = data.username;
    datosAActualizar.nombre = data.name;
    datosAActualizar.email = data.email;
    if (data.password !== '') datosAActualizar.password = bcrypt.hashSync(data.password, 8);
    if (image) datosAActualizar.avatar = image;
    datosAActualizar.pais = data.country;
    datosAActualizar.fnacimiento = data.year;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    // Actualiza el usuario
    const [numFilasAfectadas] = await User.update(
      datosAActualizar,
      { where: { usuario: id }, transaction: t },
    );
    fs.unlinkSync(path);

    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const userDespues = await User.findOne({ where: { usuario: id }, returning: true, transaction: t });

      // Crea el historial del usuario dentro de la transacción
      await UserHistory.create({
        user_id: userDespues.usuario,
        tipo_accion: 'modificación',
        datos_antiguos: userAntes,
        datos_nuevos: userDespues.get(),
        usuario_modificacion,
        fecha_modificacion: new Date(),
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
exports.addUserGoogle = async (req, res) => {
  let t;
  try {
    
    const userl = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    if (userl === null) {
      t = await sequelize.transaction();
      let image = null;
      const usuario_modificacion = "admin"
      if (req.file) {
        const { path } = req.file;
        image = fs.readFileSync(path);
        fs.unlinkSync(path);
      }
      // Crea el usuario
      const user = await User.create({
        usuario: req.body.user,
        nombre: req.body.name,
        email: req.body.email,
        pais: 66,
        fnacimiento: 2024,
        password: "",
        estado: 1,
        avatar: image,
        usuario_modificacion,
      }, { transaction: t });

      // Asigna roles al usuario
      if (req.body.roles) {
        const roles = await Role.findAll({
          where: {
            nombre: {
              [Op.or]: req.body.roles,
            },
          },
        });
        await user.setRoles(roles, { transaction: t });
      } else {
        await user.setRoles([2], { transaction: t });
      }
      // Crea el historial del usuario dentro de la transacción
      await UserHistory.create({
        user_id: user.usuario,
        tipo_accion: 'creacion',
        datos_antiguos: null,
        datos_nuevos: null,
        usuario_modificacion: usuario_modificacion,
        fecha_modificacion: new Date(),
      }, { transaction: t });
      await t.commit();
    }
    res.send({ message: 'Usuario logueado correctamente con google...' });
  } catch (err) {
    console.log("error: " + err.message + " " + err.stack)
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al registrar el usuario.' });
  }
};
