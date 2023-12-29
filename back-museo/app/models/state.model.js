module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("estado", {
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
  
    return State;
  };