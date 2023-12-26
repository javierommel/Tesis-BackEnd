module.exports = (sequelize, Sequelize) => {
    const Recomendation = sequelize.define("recomendaciones", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fnacimiento: {
        type: Sequelize.DATEONLY
      },
      estado: {
        type: Sequelize.TINYINT
      }
    });
  
    return Recomendation;

  };