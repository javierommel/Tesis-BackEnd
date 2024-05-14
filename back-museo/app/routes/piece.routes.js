const path = require('path');
const multer = require('multer');
const controller = require('../controllers/piece.controller');
const { authJwt } = require('../middleware');

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
  ]);

  app.post('/api/auth/getpiece', authJwt.verifyToken, controller.getPiece);
  app.post('/api/auth/getinformationpiece', authJwt.verifyToken, controller.getInformationPieces);
  app.post('/api/auth/updatepiece', [authJwt.verifyToken, cargarArchivos], controller.updatePiece);
  app.post('/api/auth/deletepiece', authJwt.verifyToken, controller.deletePiece);
};
