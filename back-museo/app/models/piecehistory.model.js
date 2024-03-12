module.exports = (sequelize, Sequelize) => {
  const PieceHistory = sequelize.define('historial_piezas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    piece_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo_accion: {
      type: Sequelize.STRING, // 'modificacion', 'eliminacion', 'creacion', etc.
      allowNull: false,
    },
    datos_antiguos: {
      type: Sequelize.JSONB, // Puedes ajustar el tipo de datos según tus necesidades
    },
    datos_nuevos: {
      type: Sequelize.JSONB,
    },
    fecha_modificacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    usuario_modificacion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return PieceHistory;
};
