const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
const db = require("./app/models");
const Role = db.role;

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
      return db.sequelize.sync({ force: true });
    })
    .then(() => {
      console.log('Drop and Resync Db');
      initial();
    })
    .catch(err => {
      console.error('Error while dropping tables:', err);
    });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// Require the routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});