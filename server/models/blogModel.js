const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        username: {
            type: String,
            requried: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        }

    }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog