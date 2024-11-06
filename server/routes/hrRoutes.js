const express = require('express')
const { registerHR, fetchAllHR, fetchSingleHR, EditHr } = require('../controllers/hrController')


const router = express.Router()

// Register
router.post('/', registerHR)

// Fetch all hr
router.get('/', fetchAllHR)

// Fetch single HR
router.get('/single-hr/:id', fetchSingleHR)

// Update HR 
router.put('/edit-hr/:id', EditHr)

module.exports = router