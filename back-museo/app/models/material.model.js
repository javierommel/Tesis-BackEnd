module.exports = (sequelize, Sequelize) => {
    const Material = sequelize.define("materiales", {
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
  
    return Material;
  };