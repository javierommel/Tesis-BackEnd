const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./app/models");
const Role = db.role;

var corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync({alter: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido" });
});
//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }