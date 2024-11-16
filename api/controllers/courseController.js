const asyncHandler = require('express-async-handler');
const {Course} = require('../models/schema')

// courses
const loadCourse = asyncHandler(async (req, res) =>{

    try{
        const data = await Course.find();

        res.status(200).json(data);
    }
    catch (error){
        res.status(500).json({ message: "Failed to fetch courses", error: error.message });

    }

});


module.exports = {
    loadCourse
}