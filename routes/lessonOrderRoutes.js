const express = require('express');
const router = express.Router();
const {
    createLessonOrder,
    getAllLessonOrders,
    updateLessonOrder,
    deleteLessonOrder
} = require('../controllers/lessonOrderController');

// Routes
router.post('/', createLessonOrder);
router.get('/', getAllLessonOrders);
router.put('/:orderId', updateLessonOrder);
router.delete('/:orderId', deleteLessonOrder);

module.exports = router;
