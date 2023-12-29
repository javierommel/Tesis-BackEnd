module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("tipo", {
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
  
    return Type;
  };