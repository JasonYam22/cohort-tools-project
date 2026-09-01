const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE STUDENT SCHEMA
const studentSchema = new Schema(
  {
     "_id": {
    "$oid": ObjectId ("")
  },
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  phone: {type: String},
  linkedinUrl: {type: String},
  languages: [
    {type: String},
    {type: String}
  ],
  program: {type: String},
  background: {type: String},
  image: {type: String,
    default: 'images/default-avatar.png'},
  projects: [],
  cohort: {
    $oid: ObjectId ("")
  }
  })

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
