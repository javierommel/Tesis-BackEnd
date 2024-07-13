module.exports = (sequelize, Sequelize) => {
  const Piece = sequelize.define('piezas', {
    numero_ordinal: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    numero_historico: {
      type: Sequelize.STRING,
    },
    codigo_inpc: {
      type: Sequelize.STRING,
    },
    tipo_bien: {
       type: Sequelize.INTEGER,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    otro_nombre: {
      type: Sequelize.STRING,
    },
    otros_material: {
      type: Sequelize.STRING,
    },
    tecnica: {
      //PREGUNTAR type: Sequelize.INTEGER,
      type: Sequelize.STRING,
    },
    autor: {
      type: Sequelize.STRING,
    },
    siglo: {
      type: Sequelize.STRING,
    },
    anio: {
      type: Sequelize.STRING,
    },
    alto: {
      type: Sequelize.STRING,
    },
    ancho: {
      type: Sequelize.STRING,
    },
    profundidad: {
      type: Sequelize.STRING,
    },
    diametro: {
      type: Sequelize.STRING,
    },
    espesor: {
      type: Sequelize.STRING,
    },
    peso: {
      type: Sequelize.STRING,
    },
    inscripcion: {
      type: Sequelize.TEXT,
    },
    descripcion: {
      type: Sequelize.TEXT,
    },
    ubicacion: {
      type: Sequelize.STRING,
    },
    regimen: {
      type: Sequelize.STRING,
    },
    estado_piezas: {
      type: Sequelize.INTEGER,
    },
    otros_deterioro: {
      type: Sequelize.STRING,
    },
    estado_integridad: {
      type: Sequelize.INTEGER,
    },
    conservacion: {
      type: Sequelize.STRING,
    },
    observacion: {
      type: Sequelize.TEXT,
    },
    publicidad: {
      type: Sequelize.TEXT,
    },
    imagen1: {
      type: Sequelize.BLOB,
    },
    imagen2: {
      type: Sequelize.BLOB,
    },
    entidad_investigadora: {
      type: Sequelize.STRING,
    },
    registrado: {
      type: Sequelize.STRING,
    },
    fecha_registro: {
      type: Sequelize.DATE,
    },
    revisado: {
      type: Sequelize.STRING,
    },
    fecha_revision: {
      type: Sequelize.DATE,
    },
    registro_fotográfico: {
      type: Sequelize.STRING,
    },
    realiza_foto: {
      type: Sequelize.STRING,
    },
    estado: {
      type: Sequelize.INTEGER,
      validate: {
        // Solo se permiten los valores 0, 1 o 2
        isIn: [[0, 1, 2]],
      },
    },
    usuario_modificacion: {
      type: Sequelize.STRING,
    },
  });

  return Piece;
};
