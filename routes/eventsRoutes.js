const express = require('express')
const {
    getEvents,
    getUpcomingEvents,
    createEvent,
    deleteEvent
} = require('../controllers/eventsController')
const multer = require('multer')

const router = express.Router()


// handle file uploads for post request
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    fileSize: 4 * 1024 * 1024
})

// GET events event page
router.get('/events', getEvents)
router.get('/dashboard/events-list', 
    // authMiddleware, 
    getEvents)

// GET upcomming events
router.get('/upcoming-events', getUpcomingEvents)

// POST an event
router.post('/dashboard/events', 
    upload.single('picture'), 
    createEvent)

// DELETE an event
router.delete('/dashboard/events/:id', deleteEvent)
// UPDATE an event

module.exports = router