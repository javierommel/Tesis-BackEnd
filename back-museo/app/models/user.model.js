module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usuarios", {
    usuario: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fnacimiento: {
      type: Sequelize.INTEGER
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [[0, 1, 2]],
      },
    },
    pais: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usuario_modificacion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.BLOB,
    },
  });

  return User;
};