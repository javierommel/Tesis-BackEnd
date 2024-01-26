module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comentario", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,  
      },
      usuario: {
        type: Sequelize.STRING
      },
      puntuacion: {
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.STRING
      },
      fecha_registro: {
        type: Sequelize.DATE
      }
    });
  
    return Comment;

  };