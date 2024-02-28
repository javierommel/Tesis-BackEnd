module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comentarios", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    puntuacion: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [[1, 2, 3, 4, 5]],
      },
    },
    comentario: {
      type: Sequelize.STRING
    },
    fecha_registro: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [[0, 1, 2]],
      },
    },
    usuario_modificacion: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Comment;

};