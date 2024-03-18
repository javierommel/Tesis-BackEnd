const controller = require('../controllers/general.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/general/getcountries', controller.getCountry);
  app.post('/api/general/getcontent', controller.getContent);
  app.post('/api/general/updatecontent', controller.updateContent);
};
