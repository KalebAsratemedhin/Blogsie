const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        author:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
        },
        title: {
            type: String,
            required: true
        },
        markdown: {
            type: String,
            required: true,
        },
        tags: {
            type: [String], 
            required: true,
        },        
        date: {
            type: Date,
            required: true,
        }
        
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking