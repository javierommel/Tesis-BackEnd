module.exports = (sequelize, Sequelize) => {
  const Deterioration = sequelize.define('opcion_deterioro', {
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
      allowNull: false,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [[0, 1, 2]],
      },
    },
  });

  return Deterioration;
};
