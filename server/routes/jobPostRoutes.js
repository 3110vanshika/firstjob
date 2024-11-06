const express = require('express')
const { jobPost, getAllJobPost, getSingleJobPost } = require('../controllers/jobPostController')

const router = express.Router()

// Insert job post
router.post('/', jobPost)

// Fetch all job post
router.get('/', getAllJobPost)

// Fetch single job post
router.get('/single-post/:id', getSingleJobPost)

module.exports = router