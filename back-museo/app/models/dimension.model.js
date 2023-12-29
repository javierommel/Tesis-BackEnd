module.exports = (sequelize, Sequelize) => {
    const Dimension = sequelize.define("dimensiones", {
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
  
    return Dimension;
  };