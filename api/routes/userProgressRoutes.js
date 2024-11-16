const express = require("express")
const { getUserProgress, selectUserCourse} = require("../controllers/userProgressController");

const router = express.Router()

router.get('/', getUserProgress)
router.post('/selectUserCourse', selectUserCourse)


module.exports = router