module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define('paises', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    iso: {
      type: Sequelize.STRING,
      allowNull: false,
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
        isOneOf: [0, 1, 2],
      },
    },
  });

  return Country;
};
