const fs = require('fs');
const db = require('../models');

const { sequelize } = db;
const { Op } = db.Sequelize;
const Country = db.country;
const General = db.general;
const User = db.user;
const Visit = db.visit;
const Comment = db.comment;
const Month = db.month;
const Year = db.year;
const Piece = db.piece;

exports.getCountry = (req, res) => {
  try {
    Country.findAll({
      attributes: ['id', 'nombre'],
      where: { estado: 1 },
    }).then((countries) => {
      res.send({ data: countries, message: 'Consulta realizada correctamente!' });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar países.' });
  }
};

exports.getContent = async (req, res) => {
  try {
    const general = await General.findAll({
      attributes: ['titulo', 'contenido', 'nrocomentarios', 'imagen1', 'imagen2', 'imagen3', 'imagen4'],
      where: { id: 1 },
    })
    const user = await User.count();
    const visit = await Visit.count({
      distinct: true,
      col: 'sesion'
    });
    const result = await Comment.findOne({
      attributes: [
        [
          sequelize.literal('ROUND(AVG(puntuacion) * 100 / 5)'),
          'average_percentage'
        ]
      ]
    });
    const averagePercentage = result.getDataValue('average_percentage');
    res.send({ data: { general: general, nrouser: user, nrovisit: visit, porcentage: averagePercentage }, message: 'Consulta realizada correctamente!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar contenido.' });
  }
};

exports.updateContent = async (req, res) => {
  let t;
  try {
    const imagen1 = req.files.imagen1 ? req.files.imagen1[0] : null;
    const imagen2 = req.files.imagen2 ? req.files.imagen2[0] : null;
    const imagen3 = req.files.imagen3 ? req.files.imagen3[0] : null;
    const imagen4 = req.files.imagen4 ? req.files.imagen4[0] : null;

    const imagen11 = imagen1 ? fs.readFileSync(imagen1.path) : null;
    const imagen12 = imagen2 ? fs.readFileSync(imagen2.path) : null;
    const imagen13 = imagen3 ? fs.readFileSync(imagen3.path) : null;
    const imagen14 = imagen4 ? fs.readFileSync(imagen4.path) : null;

    const {
      usuario_modificacion,
    } = req.body;
    const data = JSON.parse(req.body.data);
    t = await sequelize.transaction();
    // Construye el objeto de datos a actualizar
    const datosAActualizar = {};
    datosAActualizar.id = 1;
    datosAActualizar.titulo = data.titulo;
    datosAActualizar.contenido = data.contenido;
    datosAActualizar.nrocomentarios = data.nrocomentarios;
    if (imagen1) datosAActualizar.imagen1 = imagen11;
    if (imagen2) datosAActualizar.imagen2 = imagen12;
    if (imagen3) datosAActualizar.imagen3 = imagen13;
    if (imagen4) datosAActualizar.imagen4 = imagen14;
    datosAActualizar.usuario_modificacion = usuario_modificacion;
    // Actualiza el Pieza
    const [numFilasAfectadas] = await General.update(
      datosAActualizar,
      { where: { id: 1 }, transaction: t },
    );
    if (imagen1) fs.unlinkSync(imagen1.path);
    if (imagen2) fs.unlinkSync(imagen2.path);
    if (imagen3) fs.unlinkSync(imagen3.path);
    if (imagen4) fs.unlinkSync(imagen4.path);
    if (numFilasAfectadas > 0) {
      await t.commit();
      res.send({ message: 'Datos generales modificados correctamente!' });
    } else {
      await t.rollback();
      res.status(404).send({ message: 'Datos generales no encontrados para modificación.' });
    }
  } catch (err) {
    console.error(err.stack);
    if (t) {
      await t.rollback();
    }
    res.status(500).send({ message: err.message || 'Error al modificar datos generales.' });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { tipo } = req.body;
    console.log("tipo: " + tipo)
    switch (parseInt(tipo)) {
      case 1: const query1 = `
        select m.nombre as nombre, COALESCE(v.nacional,0) as nacional, COALESCE(v.internacional,0) as internacional
	      from(
	      SELECT
        EXTRACT(MONTH FROM v.fecha_visita) AS mes_num,
        COUNT(DISTINCT CASE WHEN u.pais = 66 THEN v.sesion END) AS nacional,
        COUNT(DISTINCT CASE WHEN u.pais != 66 THEN v.sesion END) AS internacional
        FROM
        visitas v, usuarios u 
		    where v.usuario = u.usuario
        and v.tipo=0
        GROUP BY
        EXTRACT(MONTH FROM v.fecha_visita)) v
		    right outer join meses m	  
        on m.id=v.mes_num
        `;
        const respuesta1 = await sequelize.query(query1, {
          type: sequelize.QueryTypes.SELECT
        });

        res.send({ data: respuesta1, message: 'Consulta realizada correctamente!' });
        break;
      case 2:
        const query2 = `
        select u.usuario as Usuario, u.nombre as Nombre, COUNT(u.nombre) as NroVisitas, p.nombre as Pais, (extract(year from  CURRENT_DATE)-u.fnacimiento) as Edad
        from visitas v, usuarios u, paises p
        where v.usuario=u.usuario
        and v.tipo=0
        and u.pais=p.id
        group by u.usuario, u.nombre, p.nombre, (extract(year from  CURRENT_DATE)-u.fnacimiento);
      `;
        const respuesta2 = await sequelize.query(query2, {
          type: sequelize.QueryTypes.SELECT // Especifica que el resultado es una selección
        })
        console.log(respuesta2)
        res.send({ data: respuesta2, message: 'Consulta realizada correctamente!' });
        break;
      case 3:
        const query3 = `
        select r.usuario as Usuario, r.nombre as Nombre, round(EXTRACT(EPOCH FROM (r.fecha_salida - r.fecha_ingreso)) / 60,2) AS Tiempo, r.pais as Pais, r.edad as Edad, r.fecha_ingreso, r.fecha_salida
        from 
        (select a.usuario as usuario, u.nombre as nombre, 
        max(a.fecha_ingreso) as fecha_ingreso, max(a.fecha_salida) as fecha_salida, 
        p.nombre as pais,  (extract(year from  CURRENT_DATE)-u.fnacimiento) as edad , a.sesion
        from 
        (select v.usuario, v.sesion,
        case when v.tipo=0 then (v."createdAt") end as fecha_ingreso,
        case when v.tipo=3 then (v."createdAt") end as fecha_salida
        from visitas v
        where v.tipo in (0,3)) a, usuarios u, paises p
        where a.usuario=u.usuario
        and u.pais=p.id
        group by a.usuario, u.nombre, a.sesion, p.nombre, (extract(year from  CURRENT_DATE)-u.fnacimiento)) r
        order by EXTRACT(EPOCH FROM (r.fecha_salida - r.fecha_ingreso)) / 60 desc;
        `;

        const respuesta3 = await sequelize.query(query3, {
          type: sequelize.QueryTypes.SELECT // Especifica que el resultado es una selección
        })

        res.send({ data: respuesta3, message: 'Consulta realizada correctamente!' });
        break;
      case 4:
        const query4 = `
        select COALESCE(v.count, 0) as count, p.id as puntuacion 
        from
        (SELECT COUNT(puntuacion) count, puntuacion 
        FROM comentarios 
        GROUP BY puntuacion ) v
        right outer join puntuaciones p
        on p.id = v.puntuacion
        ORDER BY p.id DESC;
      `;
        const respuesta4 = await sequelize.query(query4, {
          type: sequelize.QueryTypes.SELECT // Especifica que el resultado es una selección
        })
        res.send({ data: respuesta4, message: 'Consulta realizada correctamente!' });
        break;
      case 5:
        const query = `
          SELECT p.numero_ordinal, p.nombre, 
          SUM(CASE WHEN v.tipo = 1 THEN 1 ELSE 0 END) AS visitas,
          SUM(CASE WHEN v.tipo = 2 THEN 1 ELSE 0 END) AS recomendaciones
          FROM visitas v
          JOIN piezas p ON p.numero_ordinal = v.id_piece
          WHERE v.tipo IN (1, 2)
          GROUP BY p.numero_ordinal, p.nombre
          ORDER BY visitas, recomendaciones DESC
          LIMIT 7;
        `;

        const respuesta5 = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT // Especifica que el resultado es una selección
        })

        res.send({ data: respuesta5, message: 'Consulta realizada correctamente!' });
        break;
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al recuperar reporte.' });
  }
};
