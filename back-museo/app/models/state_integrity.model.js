module.exports = (sequelize, Sequelize) => {
  const State_integrity = sequelize.define('estado_integridades', {
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
        isOneOf: [0, 1, 2],
      },
    },
  });

  return State_integrity;
};
