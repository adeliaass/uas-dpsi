const express = require('express');
const router = express.Router();
const {
    createTeacher,
    getAllTeachers,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');

// Routes
router.post('/', createTeacher);
router.get('/', getAllTeachers);
router.put('/:teacherId', updateTeacher);
router.delete('/:teacherId', deleteTeacher);

module.exports = router;
