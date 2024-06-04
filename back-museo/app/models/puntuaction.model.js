module.exports = (sequelize, Sequelize) => {
  const Puntuaction = sequelize.define('puntuaciones', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Puntuaction;
};
