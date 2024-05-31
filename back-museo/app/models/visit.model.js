module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define('visitas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sesion: {
      type: Sequelize.STRING,
    },
    usuario: {
      type: Sequelize.STRING,
    },
    fecha_visita: {
      type: Sequelize.DATEONLY,
    },
    pregunta: {
      type: Sequelize.STRING,
    },
  });

  return Visit;
};
