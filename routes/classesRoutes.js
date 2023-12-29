const express = require('express')
const {
    getClasses,
    createClass,
    deleteClass
} = require('../controllers/classesController')
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')



const router = express.Router()


// GET classes
router.get('/classes', getClasses)
router.get('/dashboard/classes-list', getClasses)

// POST class
router.post('/dashboard/classes-list', requireAuth, requireAdmin, createClass)

//DELETE class
router.delete('/dashboard/classes-list/:id', requireAuth, deleteClass)

//UPDATE claa

module.exports = router