const express = require('express');
const { candidateRegister, login } = require('../controllers/candidateController');

const router = express.Router();

router.post('/', candidateRegister);
router.post('/login', login)

module.exports = router;