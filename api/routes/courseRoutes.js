const express = require("express")
const { loadCourse} = require("../controllers/courseController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router()

router.get('/', protect, loadCourse)


module.exports = router