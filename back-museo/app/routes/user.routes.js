const path = require('path');
const multer = require('multer');
const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../upload'));
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}+${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});
const upload = multer({ storage });

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.get(
    '/api/test/user',
    [authJwt.verifyToken],
    controller.userBoard,
  );

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard,
  );

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard,
  );

  app.post('/api/auth/getuser', authJwt.verifyToken, controller.getUser);

  app.post('/api/auth/getuserid', authJwt.verifyToken, controller.getUserId);

  app.post('/api/auth/deleteuser', authJwt.verifyToken, controller.deleteUser);

  app.post('/api/auth/updateuser', authJwt.verifyToken, controller.updateUser);

  app.post('/api/auth/updateuserprofile', [authJwt.verifyToken, upload.single('avatar')], controller.updateUserProfile);

  app.post('/api/auth/addusergoogle', upload.single('avatar'), controller.addUserGoogle);

  app.post('/api/auth/savequestion', authJwt.verifyToken, controller.saveQuestion);


};
