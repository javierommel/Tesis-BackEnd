module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visitas", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      usuario: {
        type: Sequelize.STRING
      },
      fecha_visita: {
        type: Sequelize.DATEONLY
      },
      pregunta: {
        type: Sequelize.STRING
      }
    });
  
    return Visit;

  };