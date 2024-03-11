module.exports = (sequelize, Sequelize) => {
  const Technique = sequelize.define('tecnicas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.INTEGER,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [0, 1, 2],
      },
    },
  });

  return Technique;
};
