const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const challengeTypes = ["SELECT", "ASSIST"];

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    imageSrc: {type: String, required: true}
});

// courseSchema.plugin(AutoIncrement, {course_id: 'id'});

// const userProgressSchema = new mongoose.Schema({
//     userId: {type: String, required: true, unique: true},
//     userName: {type: String, required: true, default: "User"},
//     userImageSrc: {type: String, required: true, default: "/mascot.svg"},
//     activeCourseId: {type: Number, ref: "Course"},
//     hearts: {type: Number, required: true, default: 5},
//     points: {type: Number, required: true, default: 0},
// });

//  ---------------------------------------------------------------------   //

const unitSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    order: {type: Number, required: true},
});
// unitSchema.plugin(AutoIncrement, { unit_id: "id" });

const lessonSchema = new mongoose.Schema({
    title: {type: String, required: true},
    unitId: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true},
    order: {type: Number, required: true},
});

const challengeSchema = new mongoose.Schema({
    lessonId: {type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true},
    type: {type: String, enum: challengeTypes, required: true},
    question: {type: String, required: true},
    order: {type: Number, required: true},
});

const challengeOptionSchema = new mongoose.Schema({
    challengeId: {type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true},
    text: {type: String, required: true},
    correct: {type: Boolean, required: true},
    imageSrc: {type: String},
    audioSrc: {type: String},
});

// const challengeProgressSchema = new mongoose.Schema({
//     id: {type: Number, required: true, unique: true},
//     userId: {type: String, required: true},
//     challengeId: {type: Number, ref: "Challenge", required: true},
//     completed: {type: Boolean, default: false},
// });


const Course = mongoose.model('Course', courseSchema);
// const UserProgress = mongoose.model("UserProgress", userProgressSchema);
const Unit = mongoose.model("Unit", unitSchema);
const Lesson = mongoose.model("Lesson", lessonSchema);
const Challenge = mongoose.model("Challenge", challengeSchema);
const ChallengeOption = mongoose.model("ChallengeOption", challengeOptionSchema);
// const ChallengeProgress = mongoose.model("ChallengeProgress", challengeProgressSchema);


module.exports = {
    Course,
    // UserProgress,
    Unit,
    Lesson,
    Challenge,
    ChallengeOption,
    // ChallengeProgress
};