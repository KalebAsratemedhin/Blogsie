const mongoose = require('mongoose');

const followSchema = mongoose.Schema(
    {
        follower:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
        },
        following:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
        },
    },
    {
        timestamps: true
    }
)

const Follow = mongoose.model('Follow', followSchema)

module.exports = Follow