const express = require("express")
const router = express.Router()


const cohortsRouter = require("./cohorts.routes")
router.use("/cohorts", cohortsRouter)

const studentsRouter = require("./students.routes")
router.use("/students", studentsRouter)

module.exports = router