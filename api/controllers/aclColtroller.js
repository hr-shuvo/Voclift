const asyncHandler = require('express-async-handler');
const {Course, Unit, Lesson, Challenge, ChallengeOption} = require('../models/schema')


const seedData = asyncHandler(async (req, res) => {
    try {

        try {
            await Course.collection.drop();
            await Unit.collection.drop();
            await Lesson.collection.drop();
            await Challenge.collection.drop();
            await ChallengeOption.collection.drop();

            console.log("Collection dropped.");
        } catch (err) {
            if (err.code === 26) console.log("Failed to drop collection");
            else throw err;
        }

        const course = await Course.create({
            title: "Spanish",
            imageSrc: "/es.svg",
        });

        const units = await Unit.insertMany([
            {
                courseId: course._id,
                title: "Unit 1",
                description: `Learn the basics of ${course.title}`,
                order: 1,
            },
            {
                courseId: course._id,
                title: "Unit 2",
                description: `Advance your basics of ${course.title}`,
                order: 2,
            },
        ]);

        for (const unit of units) {
            const index = units.indexOf(unit);
            const lessons = await Lesson.insertMany([
                {
                    unitId: unit._id,
                    title: 'Nouns ' + index,
                    order: 1
                },
                {
                    unitId: unit._id,
                    title: 'Verbs ' + index,
                    order: 1
                }
            ]);


            for (const lesson of lessons) {
                const index = lessons.indexOf(lesson);
                const challenges = await Challenge.insertMany([
                    {
                        lessonId: lesson._id,
                        type: "SELECT",
                        question: "Which one of these is 'the man'? " + index,
                        order: 1,
                    },
                    {
                        lessonId: lesson._id,
                        type: "ASSIST",
                        question: "'the man' " + index,
                        order: 2,
                    },
                ]);

                for (const challenge of challenges) {
                    const index = challenges.indexOf(challenge);
                    if (challenge.order === 1) {
                        await ChallengeOption.insertMany([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el hombre " + index,
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer " + index,
                                imageSrc: "/woman.svg",
                                audioSrc: "/es_woman.mp3",
                            },
                        ]);
                    } else if (challenge.order === 2) {
                        await ChallengeOption.insertMany([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el hombre " + index,
                                audioSrc: "/es_man.mp3",
                            },
                        ]);
                    }
                }


            }


        }


        res.send('Seeding finished successfully');

        console.log('Seeding finished successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
        res.send('Error seeding database');
    }


})

module.exports = {
    seedData
}