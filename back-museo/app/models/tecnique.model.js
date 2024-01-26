module.exports = (sequelize, Sequelize) => {
    const Tecnique = sequelize.define("tecnica", {
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
  
    return Tecnique;
  };