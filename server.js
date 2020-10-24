const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

db.Workout.create({ name: "Workout" })
  .then(workItdb => {
    console.log(workItdb);
  })
  .catch(({message}) => {
    console.log(message);
  });

require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});