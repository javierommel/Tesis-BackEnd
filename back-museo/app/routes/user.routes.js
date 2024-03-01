const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("asf")
    cb(null, path.join(__dirname, '../upload'))
  },
  filename: function (req, file, cb) {
    console.log("asfwerwer")
    cb(null, `${file.originalname}+${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
});
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/auth/getuser", controller.getUser);

  app.post("/api/auth/getuserid", controller.getUserId);

  app.post("/api/auth/deleteuser", controller.deleteUser);

  app.post("/api/auth/updateuser", controller.updateUser);

  app.post("/api/auth/updateuserprofile", upload.single('avatar'), controller.updateUserProfile);

};
