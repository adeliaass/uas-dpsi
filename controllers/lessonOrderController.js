const { LessonOrder, Student, Teacher, History, Schedule } = require('../models');

// Create a lesson order
const createLessonOrder = async (req, res) => {
    try {
        const { studentId, orderType, teacherId, lessonCategory, date, time, duration, location } = req.body;
        const lessonOrder = await LessonOrder.create({
            studentId,
            orderType,
            teacherId,
            lessonCategory,
            date,
            time,
            duration,
            location
        });
        res.status(201).json({ message: 'Lesson order created successfully', lessonOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error creating lesson order', error });
    }
};

// Get all lesson orders
const getAllLessonOrders = async (req, res) => {
    try {
        const lessonOrders = await LessonOrder.findAll({
            include: [
                { model: Student },
                { model: Teacher },
                { model: History },
                { model: Schedule }
            ]
        });
        res.status(200).json(lessonOrders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching lesson orders', error });
    }
};

// Update a lesson order by orderId
const updateLessonOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const updatedLessonOrder = await LessonOrder.update(req.body, {
            where: { orderId }
        });
        res.status(200).json({ message: 'Lesson order updated successfully', updatedLessonOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error updating lesson order', error });
    }
};

// Delete a lesson order by orderId
const deleteLessonOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await LessonOrder.destroy({
            where: { orderId }
        });
        res.status(200).json({ message: 'Lesson order deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting lesson order', error });
    }
};

module.exports = {
    createLessonOrder,
    getAllLessonOrders,
    updateLessonOrder,
    deleteLessonOrder
};
