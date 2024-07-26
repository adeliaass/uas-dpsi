const express = require('express');
const router = express.Router();
const {
    createTeacher,
    getAllTeachers,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');
const { authenticate, checkRole } = require('../middleware/authMiddleware');

// Routes

// Admin can create a teacher
router.post('/', authenticate, checkRole('admin'), createTeacher);

// Both admin and student can get teacher information
router.get('/', authenticate, (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'student') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
}, getAllTeachers);

// Only admin can update teacher information
router.put('/:teacherId', authenticate, checkRole('admin'), updateTeacher);

// Only admin can delete a teacher
router.delete('/:teacherId', authenticate, checkRole('admin'), deleteTeacher);

module.exports = router;
