const asyncHandler = require('express-async-handler')
const User = require("../models/userModel");

const parser = require('ua-parser-js');
const {generateToken} = require("../utils");

const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all the required fields.')
    }

    if (password.length < 4) {
        res.status(400)
        throw new Error('Password must be al least 6 character.')
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error('Email already in use.')
    }

    // Get UserAgent
    const ua = parser(req.headers['user-agent']);
    const userAgent = [ua.ua]

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
        userAgent
    })

    // Generate Token
    const token = generateToken(user._id)

    // Set HTTP_ONLY Cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true
    })

    if(user){
        const {password, ...data} = user.toJSON()

        res.status(201).json(data);
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

});



module.exports = {
    registerUser
}