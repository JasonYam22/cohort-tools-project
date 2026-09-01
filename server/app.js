
const cors = require("cors")
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

const Cohort = require("./models/cohorts.model.js")
const Student = require("./models/students.model.js")

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

 
//

// MIDDLEWARE
// Set up CORS middleware here:
// ...
app.use(
  cors({ 
  origin: "http://localhost:5173" 
 })
); 


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohorts = require("./models/cohorts.model.js")
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts)
})

const students = require("./models/students.model.js")
app.get("/api/students", (req, res) => {
  res.json(students)
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
