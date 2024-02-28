const db = require("../models");
const User = db.user;
const Role = db.role;
const UserHistory = db.userhistory;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUser = (req, res) => {
  try {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    User.findAll({
      attributes: ['usuario', 'nombre', 'email', 'password', 'fnacimiento', 'pais', 'estado'],
      limit: pageSize,
      where: { estado: [0, 1] },
      offset: offset,
      include: {
        model: db.role,
        through: 'user_roles',
        attributes: ['id'], // Selecciona solo el campo 'name' de la tabla 'role'
      },
    }).then(users => {
      const usersWithRoles = users.map(user => {
        const roles = user.roles.map(role => role.id).join(', ');
        return {
          usuario: user.usuario,
          nombre: user.nombre,
          email: user.email,
          fnacimiento: user.fnacimiento,
          estado: user.estado,
          pais: user.pais,
          roles: roles,
        };
      });
      Role.findAll({
        attributes: ['id', 'nombre'],
        where: { estado: 1 }
      }).then(role => {
        res.send({ roles: role, data: usersWithRoles, message: "Consulta realizada correctamente!" });
      })

    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  catch (err) {
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
        usuario_modificacion: usuario_modificacion,
        estado: 2,
      },
      { where: { usuario: id }, transaction: t }
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
        usuario_modificacion: usuario_modificacion
      }, { transaction: t });
      // Confirma la transacción
      await t.commit();
      res.send({ message: "Usuario eliminado correctamente!" });
    } else {
      // Si no se actualizó ningún usuario, revierte la transacción
      await t.rollback();
      res.status(404).send({ message: "Usuario no encontrado para eliminación." });
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || "Error al eliminar usuarios." });
  }
};

exports.updateUser = async (req, res) => {
  let t;
  try {
    const { id, data, roles, usuario_modificacion, image } = req.body;
    console.log("data: " + JSON.stringify(data))
    console.log("iamge: "+image)
    t = await sequelize.transaction();
    // Busca el usuario antes de la actualización
    const userAntes = await User.findOne({ where: { usuario: id }, transaction: t });
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar["usuario"]=data.username;
    datosAActualizar["nombre"]=data.name;
    datosAActualizar["email"]=data.email;
    if (data.password!=="") datosAActualizar["password"]=bcrypt.hashSync(data.password, 8);
    if (image) datosAActualizar["avatar"]=image;
    datosAActualizar["pais"]=data.country;
    datosAActualizar["fnacimiento"]=data.year;
    datosAActualizar['usuario_modificacion'] = usuario_modificacion;
    // Actualiza el usuario
    const [numFilasAfectadas] = await User.update(
      datosAActualizar,
      { where: { usuario: id }, transaction: t }
    );
    if (numFilasAfectadas > 0) {
      // Busca el usuario después de la actualización
      const userDespues = await User.findOne({ where: { usuario: id }, returning: true, transaction: t });
      // Elimina roles existentes y establece nuevos roles
      // Obtiene los roles actuales del usuario
      const rolesActuales = await userDespues.getRoles();
      // Elimina los roles actuales
      await userDespues.removeRoles(rolesActuales, { transaction: t });
      
      if (roles) {
        const rolesEncontrados = await Role.findAll({
          where: {
            nombre: {
              [Op.or]: roles
            }
          },
          transaction: t
        });
        await userDespues.setRoles(rolesEncontrados, { transaction: t });
      } else {
        await userDespues.setRoles([1], { transaction: t });
      }
      // Crea el historial del usuario dentro de la transacción
      await UserHistory.create({
        user_id: userDespues.usuario,
        tipo_accion: 'modificación',
        datos_antiguos: userAntes,
        datos_nuevos: userDespues.get(),
        usuario_modificacion: usuario_modificacion
      }, { transaction: t });
      await t.commit();
      res.send({ message: "Usuario modificado correctamente!" });
    } else {
      await t.rollback();
      res.status(404).send({ message: "Usuario no encontrado para modificación." });
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
        usuario: usuario,
        estado: [1]
      },
    }).then(user => {
      console.log("user"+JSON.stringify(user))
      const data = user.length>0?{
        usuario: user[0].usuario,
        nombre: user[0].nombre,
        email: user[0].email,
        fnacimiento: user[0].fnacimiento,
        estado: user[0].estado,
        pais: user[0].pais,
        avatar: user[0].avatar,
      }:null;
      res.send({ data: data, message: "Consulta realizada correctamente!" });

    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar usuarios.' });
  }
};
