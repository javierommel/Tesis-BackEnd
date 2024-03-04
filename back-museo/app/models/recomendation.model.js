module.exports = (sequelize, Sequelize, DataTypes) => {
  const Recomendation = sequelize.define(
    'recomendaciones',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      embedding: {
        type: DataTypes.VECTOR(3),
      },
      titulo: {
        type: Sequelize.STRING,
      },
      texto: {
        type: Sequelize.STRING,
      },
      documento: {
        type: Sequelize.STRING,
      },
    },
    {
      modelName: 'recomendaciones',
      tableName: 'recomendaciones',
      indexes: [
        {
          fields: ['embedding'],
          using: 'hnsw',
          operator: 'vector_cosine_ops',
        },
      ],
    },
  );

  return Recomendation;
};
