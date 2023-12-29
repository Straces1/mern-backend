const Event = require('../models/event')
const mongoose = require('mongoose')
const fs = require('fs')




// GET events event page
const getEvents = async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 })
    res.status(200).json(events)
    // res.send("hello")
}
// GET evets home page
const getUpcomingEvents = async (req, res) => {
    const events = await Event.find().limit(2).sort({createdAt: -1})
    res.status(200).json(events)
}
// POST an event
const createEvent = async (req, res) => {
    const {title, desc, snippet, date} = req.body
    const picture = req.file.path
    try {
        const event = await Event.create({title, desc, snippet, date, picture})
        res.status(200).json(event)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}
// DELETE an event
const deleteEvent = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such an event'})
    }
    const event = await Event.findById(id)
    const picture = event.picture
    if(picture){
        fs.unlinkSync(`./${picture}`)
    }
    const eventToDelete = await Event.findByIdAndDelete({_id: id})

    if(!eventToDelete){
        return res.status(404).json({error: 'No such a event'})
    }

    res.status(200).json({message: `Event ${event.title} deleted`})

    
}
// UPDATE an event

module.exports = {
    getEvents,
    getUpcomingEvents,
    createEvent,
    deleteEvent
}