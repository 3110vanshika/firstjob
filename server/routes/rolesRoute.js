const express = require('express')
const { jobRoles, getRoles } = require('../controllers/rolesController')

const router = express.Router()

// register roles
router.post('/', jobRoles)

// Get roles
router.get('/', getRoles)

module.exports = router