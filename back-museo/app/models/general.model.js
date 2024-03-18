module.exports = (sequelize, Sequelize) => {
  const General = sequelize.define('generales', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contenido: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    imagen1: {
      type: Sequelize.BLOB,
    },
    imagen2: {
      type: Sequelize.BLOB,
    },
    imagen3: {
      type: Sequelize.BLOB,
    },
    imagen4: {
      type: Sequelize.BLOB,
    },
    usuario_modificacion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return General;
};
