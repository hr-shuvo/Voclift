const express = require("express")

const {registerUser, loginUser, logoutUser, getUser} = require('../controllers/authController');


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/user', getUser)




module.exports = router