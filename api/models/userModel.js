const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true,
            trim: true,
            // match: []
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        bio: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            required: true,
            default: 'member', // subscriber, admin, suspended
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        userAgent: {
            type: Array,
            required: true,
            default: []
        }

    },
    {
        timestamps: true,
        minimize: false
    }
);

const User = mongoose.model('User', userSchema)
module.exports = User