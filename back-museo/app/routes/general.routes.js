const path = require('path');
const multer = require('multer');
const { authJwt } = require('../middleware');
const controller = require('../controllers/general.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, '../upload'));
    },
    filename(req, file, cb) {
      cb(null, `${file.originalname}+${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
  });
  const cargarArchivos = multer({ storage }).fields([
    { name: 'imagen1' },
    { name: 'imagen2' },
    { name: 'imagen3' },
    { name: 'imagen4' },
  ]);

  app.post('/api/general/getcountries', controller.getCountry);
  app.post('/api/general/getcontent', controller.getContent);
  app.post('/api/general/getreport', controller.getReport);
  app.post('/api/general/updatecontent', [authJwt.verifyToken, cargarArchivos], controller.updateContent);
};
