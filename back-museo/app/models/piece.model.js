module.exports = (sequelize, Sequelize) => {
    const Piece = sequelize.define("piezas", {
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
  
    return Piece;

  };