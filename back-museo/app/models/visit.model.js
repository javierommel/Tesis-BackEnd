module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visitas", {
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
  
    return Visit;

  };