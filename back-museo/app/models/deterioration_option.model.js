module.exports = (sequelize, Sequelize) => {
    const Deterioration_option = sequelize.define("opcion_deterioro", {
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
  
    return Deterioration_option;
  };