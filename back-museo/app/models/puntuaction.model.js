module.exports = (sequelize, Sequelize) => {
    const Puntuaction = sequelize.define("puntuacion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER
      }
    });
  
    return Puntuaction;
  };