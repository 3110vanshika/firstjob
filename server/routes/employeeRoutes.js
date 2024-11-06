const express = require('express');
const { register, upload, getAllEmployees, updateEmployee, fetchSingleEmployee, deleteEmployee } = require('../controllers/employeeController');

const router = express.Router();

router.post('/', upload, register);

// Fetch all employees
router.get('/', getAllEmployees);

// Fetch single employee
router.get('/single-employee/:employee_id', fetchSingleEmployee)

// update employee
router.put('/edit-employee/:employee_id', updateEmployee)

// Delete employee
router.delete('/:employee_id', deleteEmployee)

module.exports = router;
