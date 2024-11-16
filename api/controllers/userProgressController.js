const asyncHandler = require("express-async-handler");
const {UserProgress} = require("../models/schema");
const jwt = require("jsonwebtoken");


// getUserProgress
const getUserProgress = asyncHandler(async (req, res) => {

    console.log('calling user progress')

    try {
        const cookie = req.cookies['token'];
        if (!cookie) {
            return res.status(400).json({ message: 'JWT token not found' });
        }

        const claims = jwt.verify(cookie, process.env.JWT_SECRET);

        if (!claims) {
            return res.status(401).send({
                message: 'user unauthorized'
            })
        }

        const data = await UserProgress.findOne({userId: claims.id});

        console.log('returning user progress')

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch user progress", error: error.message});

    }
});

const selectUserCourse = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies['token'];
        const claims = jwt.verify(cookie, process.env.JWT_SECRET);

        if (!claims) {
            return res.status(401).send({
                message: 'user unauthorized'
            })
        }

        const userId = claims.id;
        const {courseId} = req.body
        if (!courseId) {
            return res.status(400).json({message: 'Invalid Course'})
        }



        const existingUserProgress = await UserProgress.findOne({userId: claims.id});
        if (existingUserProgress) {
            await UserProgress.updateOne({userId}, {
                $set: {
                    activeCourseId: courseId,
                    userName: 'User 2',
                    userImageSrc: '/mascot.svg'
                }
            })

            return res.status(200).json({message: 'course updated successful'})

        } else {
            await UserProgress.create({
                userId,
                activeCourseId: courseId,
                userName: 'User 1',
                userImageSrc: '/mascot.svg',
            });

            return res.status(200).json({message: 'course select successful'})
        }

    } catch (error) {
        res.status(500).json({message: "Failed to fetch user progress, api"});
    }
})


module.exports = {
    getUserProgress,
    selectUserCourse
}