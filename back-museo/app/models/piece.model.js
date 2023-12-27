module.exports = (sequelize, Sequelize) => {
    const Piece = sequelize.define("piezas", {
      numero_ordinal: {
        type: Sequelize.TINYINT,
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
        type: Sequelize.TINYINT
      },
      nombre: {
        type: Sequelize.STRING
      },
      otra_nombre: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.TINYINT
      },
      tecnica: {
        type: Sequelize.TINYINT
      },
      autor: {
        type: Sequelize.STRING
      },
      siglo: {
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.TINYINT
      },
      dimensiones: {
        type: Sequelize.STRING
      },
      inscripcion: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      regimen: {
        type: Sequelize.TINYINT
      },
      estado: {
        type: Sequelize.TINYINT
      },
      estado_integridad: {
        type: Sequelize.TINYINT
      },
      conservacion: {
        type: Sequelize.STRING
      },
      observacion: {
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
      }
      
    });
  
    return Piece;

  };