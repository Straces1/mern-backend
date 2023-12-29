const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    desc: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false,
    },
    index: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Class = mongoose.model('Class', classSchema);
module.exports = Class;