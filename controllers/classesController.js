const Class = require('../models/class')
const mongoose = require('mongoose')

// GET classes 
const getClasses = async (req, res) => {
    const classes = await Class.find().sort({ index: 1 })
    res.status(200).json(classes)
}
// POST a class
const createClass = async (req, res) => {
    const {title, desc, day, picture, index } = req.body
    try {
        const classs = await Class.create({title, desc, day, picture, index})
        res.json({message: `Class ${classs.title} successfully posted`})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// DELETE a class
const deleteClass = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a class'})
    }
    const classs = await Class.findByIdAndDelete({_id: id})

    if(!classs) {
        return res.status(404).json({error: 'No such a class'})
    }

    res.status(200).json({message: `Class ${classs.title} deleted`})
}

module.exports = {
    getClasses,
    createClass,
    deleteClass
}