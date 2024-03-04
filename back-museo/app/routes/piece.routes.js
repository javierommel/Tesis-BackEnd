// const { authJwt } = require('../middleware');
const controller = require('../controllers/piece.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/auth/getpiece', controller.getPiece);
};
