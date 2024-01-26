module.exports = (sequelize, Sequelize) => {
    const State_integrity = sequelize.define("estado_integridad", {
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
  
    return State_integrity;
  };