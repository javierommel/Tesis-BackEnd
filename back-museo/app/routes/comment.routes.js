const { authJwt } = require('../middleware');
const controller = require('../controllers/comment.controller');

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

  app.post('/api/auth/getcomment', controller.getCommentList);
  app.post('/api/auth/addcomment', controller.addComment);

  app.post('/api/auth/getcommentprincipal', controller.getComment);

  app.post('/api/auth/deletecomment', controller.deleteComment);

  app.post('/api/auth/updatecomment', controller.updateComment);
};
