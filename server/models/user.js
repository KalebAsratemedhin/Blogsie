const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        profilePic: {
            type: String, 
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

    }
)

const User = mongoose.model('User', userSchema)

module.exports = User