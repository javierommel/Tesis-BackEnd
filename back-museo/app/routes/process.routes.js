const path = require('path');
const multer = require('multer');
const controller = require('../controllers/process.controller');
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
  const upload = multer({ storage });

  app.post('/ia/auth/recomendation', [authJwt.verifyToken, upload.none()], controller.getRecomendation);
  app.post('/ia/auth/chat', [authJwt.verifyToken, upload.none()], controller.getChat);
  app.post('/ia/auth/cargarpiezas', [authJwt.verifyToken, upload.single('archivo')], controller.cargarPiezas);
  app.post('/ia/auth/transcribe', [authJwt.verifyToken,upload.single('audio')], controller.getTranscribe);
  app.post('/ia/auth/cargarmodelo', authJwt.verifyToken, controller.cargarModelo);
};
