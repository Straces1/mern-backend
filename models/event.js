const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    desc: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
        maxLength: 90,
    },
    date: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false,
    }
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;