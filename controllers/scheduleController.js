const { Schedule, LessonOrder } = require('../models');

// Create a schedule
const createSchedule = async (req, res) => {
    try {
        const { orderId } = req.body;
        const schedule = await Schedule.create({ orderId });
        res.status(201).json({ message: 'Schedule created successfully', schedule });
    } catch (error) {
        res.status(400).json({ message: 'Error creating schedule', error });
    }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            include: [{ model: LessonOrder }]
        });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching schedules', error });
    }
};

// Update a schedule by scheduleId
const updateSchedule = async (req, res) => {
    const { scheduleId } = req.params;
    try {
        const updatedSchedule = await Schedule.update(req.body, {
            where: { scheduleId }
        });
        res.status(200).json({ message: 'Schedule updated successfully', updatedSchedule });
    } catch (error) {
        res.status(400).json({ message: 'Error updating schedule', error });
    }
};

// Delete a schedule by scheduleId
const deleteSchedule = async (req, res) => {
    const { scheduleId } = req.params;
    try {
        await Schedule.destroy({
            where: { scheduleId }
        });
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting schedule', error });
    }
};

module.exports = {
    createSchedule,
    getAllSchedules,
    updateSchedule,
    deleteSchedule
};
