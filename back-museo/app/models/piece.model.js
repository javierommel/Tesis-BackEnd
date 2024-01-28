const { STRING } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Piece = sequelize.define("piezas", {
      numero_ordinal: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,  
      },
      numero_historico: {
        type: Sequelize.STRING
      },
      codigo_inpc: {
        type: Sequelize.STRING
      },
      tipo_bien: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      otro_nombre: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.INTEGER
      },
      otros_material: {
        type: Sequelize.STRING
      },
      tecnica: {
        type: Sequelize.INTEGER
      },
      autor: {
        type: Sequelize.STRING
      },
      siglo: {
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.INTEGER
      },
      alto: {
        type: Sequelize.FLOAT
      },
      ancho: {
        type: Sequelize.FLOAT
      },
      diametro: {
        type: Sequelize.INTEGER
      },
      espesor: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      inscripcion: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      regimen: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.INTEGER
      },
      opcion_deterioro: {
        type: Sequelize.INTEGER
      },
      otros_deterioro: {
        type: Sequelize.STRING
      },
      estado_integridad: {
        type: Sequelize.INTEGER
      },
      conservacion: {
        type: Sequelize.STRING
      },
      observacion: {
        type: Sequelize.STRING
      },
      publicidad: {
        type: Sequelize.STRING
      },
      imagen1: {
        type: Sequelize.STRING
      },
      imagen2: {
        type: Sequelize.STRING
      },
      entidad_investigadora: {
        type: Sequelize.STRING
      },
      registrado: {
        type: Sequelize.STRING
      },
      fecha_registro: {
        type: Sequelize.DATE
      },
      revisado: {
        type: Sequelize.STRING
      },
      fecha_revision: {
        type: Sequelize.DATE
      },
      registro_fotográfico: {
        type: Sequelize.STRING
      },
      usuario_modificacion: {
        type: Sequelize.STRING
      }
    });
  
    return Piece;

  };