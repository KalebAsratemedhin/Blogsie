const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        username:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
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
        
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking