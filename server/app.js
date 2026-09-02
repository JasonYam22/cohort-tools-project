const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

const Cohort = require("./models/cohorts.model");
const Student = require("./models/students.model");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

//

// MIDDLEWARE
// Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ... 

// get all cohorts
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find(req.query)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// create cohort
app.post("/api/cohorts", (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohort.create({
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// get cohort detail
app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// update single cohort detail
app.put("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new: true})
  .then((updatedCohort) => {
    res.status(200).json(updatedCohort)
  })
   .catch((error) => {
      res.status(500).json({ error: error.message });
    });
})

// delete one cohort
 app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
   .then((cohort) => {
    res.status(204).json(cohort)
  })
   .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}) 

// -----------------------------------------------------------------------------------------------------------

// get all students 
app.get("/api/students", (req, res, next) => {
  Student.find(req.query)
  .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// get all students for given cohort
app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
  .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// create student
app.post("/api/students", (req, res, next) => {
  const {
  firstName,
  lastName,
  email,
  phone,
  linkedinUrl,
  languages,
  program,
  background,
  image,
  projects,
  cohort
  } = req.body;

  Student.create({
    firstName,
  lastName,
  email,
  phone,
  linkedinUrl,
  languages,
  program,
  background,
  image,
  projects,
  cohort
  })
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// get student detail
app.get("/api/students/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
  .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// update single student detail
app.put("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, {new: true})
  .then((updatedStudent) => {
    res.status(200).json(updatedStudent)
  })
   .catch((error) => {
      res.status(500).json({ error: error.message });
    });
})

// delete one student
 app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
   .then((student) => {
    res.status(204).json(student)
  })
   .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}) 

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/* const cohorts = require("./models/cohorts.model.js");
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

const students = require("./models/students.model.js");
app.get("/api/students", (req, res) => {
  res.json(students);
});
 */
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
