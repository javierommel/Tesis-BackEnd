module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("usuarios", {
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
        type: Sequelize.INTEGER
      }
    });
  
    return User;
  };