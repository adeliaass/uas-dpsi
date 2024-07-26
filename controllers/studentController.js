const { Student, LessonOrder, User } = require('../models');

// Create a student
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{ model: LessonOrder }, { model: User }]
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching students', error });
    }
};

// Update a student by studentId
const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const updatedStudent = await Student.update(req.body, {
            where: { studentId }
        });
        res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        res.status(400).json({ message: 'Error updating student', error });
    }
};

// Delete a student by studentId
const deleteStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        await Student.destroy({
            where: { studentId }
        });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting student', error });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
};
