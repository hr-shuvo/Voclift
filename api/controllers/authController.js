const asyncHandler = require('express-async-handler')
const User = require("../models/userModel");
const bcrypt = require('bcryptjs')

const parser = require('ua-parser-js');
const {generateToken} = require("../utils");
const jwt = require("jsonwebtoken");

// register
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

// login user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Validation
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add email and password');
    }

    const user = await User.findOne({email});
    if (!user) {
        res.status(404)
        throw new Error('User not found');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        res.status(404)
        throw new Error('Invalid email or password');
    }

    // Trigger 2FA for unknown UserAgent
    // Get UserAgent
    // const ua = parser(req.headers['user-agent']);
    // const thisUserAgent = ua.ua

    // const allowedAgent = user.userAgent.includes(thisUserAgent)
    // if (!allowedAgent) {
    //     // Generate 6 digit code
    //     const loginCode = Math.floor(100000 + Math.random() * 900000)
    //     console.log(loginCode)
    //
    //     // Encrypt login code before saving to DB
    //     const encryptedLoginCode = cryptr.encrypt(loginCode.toString())
    //
    //     let userToken = await Token.findOne({userId: user._id});
    //     if (userToken) {
    //         await userToken.deleteOne()
    //     }
    //
    //     // Save token to DB
    //
    //     await new Token({
    //         userId: user._id,
    //         lToken: encryptedLoginCode,
    //         createdAt: Date.now(),
    //         expiresAt: Date.now() + 10 * (60 * 1000) // 10 minutes
    //     }).save();
    //
    //     res.status(400)
    //     throw new Error('New browser or device detected')
    // }

    // Generate Token
    const token = generateToken(user._id);

    if (user && passwordIsCorrect) {
        // Set HTTP_ONLY Cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: 'none',
            secure: true
        })

        const {_id, name, email, phone, bio, photo, role, isVerified} = user

        res.status(200).json({
            _id, name, email, phone, bio, photo, role, isVerified, token
        });

    } else {
        res.status(400)
        throw new Error('Something went wrong, pleases try again');
    }

});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });

    return res.status(200).json({message: 'Logout successful'});
});

const getUser = asyncHandler(async (req, res) =>{

    try{
        const cookie = req.cookies['token'];
        const claims = jwt.verify(cookie, process.env.JWT_SECRET);

        if(!claims){
            return res.status(401).send({
                message: 'user unauthorized'
            })
        }

        const user = await User.findOne({_id: claims.id})
        const {password, ...data} = await user.toJSON()

        res.send(data);
    }
    catch(error){
        return res.status(401).send({
            message: 'unauthorized'
        })
    }
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}