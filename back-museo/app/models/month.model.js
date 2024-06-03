module.exports = (sequelize, Sequelize) => {
  const Month = sequelize.define('meses', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Month;
};
