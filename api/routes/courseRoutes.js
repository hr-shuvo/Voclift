const express = require("express")
const { loadCourse} = require("../controllers/courseController");

const router = express.Router()

router.get('/', loadCourse)


module.exports = router