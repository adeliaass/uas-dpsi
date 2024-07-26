const { Teacher, LessonOrder } = require('../models');

// Create a teacher
const createTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json({ message: 'Teacher created successfully', teacher });
    } catch (error) {
        res.status(400).json({ message: 'Error creating teacher', error });
    }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [{ model: LessonOrder }]
        });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching teachers', error });
    }
};

// Update a teacher by teacherId
const updateTeacher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const updatedTeacher = await Teacher.update(req.body, {
            where: { teacherId }
        });
        res.status(200).json({ message: 'Teacher updated successfully', updatedTeacher });
    } catch (error) {
        res.status(400).json({ message: 'Error updating teacher', error });
    }
};

// Delete a teacher by teacherId
const deleteTeacher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        await Teacher.destroy({
            where: { teacherId }
        });
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting teacher', error });
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    updateTeacher,
    deleteTeacher
};