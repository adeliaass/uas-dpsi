const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

// Routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.put('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

module.exports = router;
