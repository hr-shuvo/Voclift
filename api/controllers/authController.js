const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) =>{
    const {name} = req.body;

    res.send(name);
});



module.exports = {
    registerUser
}