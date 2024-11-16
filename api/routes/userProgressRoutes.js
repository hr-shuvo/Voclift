const express = require("express")
const { getUserProgress, selectUserCourse} = require("../controllers/userProgressController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router()

router.get('/', protect, getUserProgress)
router.post('/selectUserCourse', protect, selectUserCourse)


module.exports = router