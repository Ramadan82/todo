const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT;
const dbCon = require("./dbCon");

const callback = () => console.log("Now listening on port 8080");
dbCon
  .then(app.listen(port, callback))
  .catch((err) => console.error(`Error connecting to the database. ${err}`));

const todoRoutes = require("./src/routes/todoRoutes");
const todoUsersRoutes = require("./src/routes/todoUsersRoutes");

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/users", todoUsersRoutes);
