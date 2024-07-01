const express = require('express');
const router = express.Router();
const path = require('path');
const timeSlotController = require('../controllers/time');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/availableslots.html'));
});

router.get('/timeSlots', timeSlotController.getAvailableTimeSlots);
router.post('/timeSlots', timeSlotController.createTimeSlot);
router.put('/timeSlots/:id', timeSlotController.updateTimeSlot);
router.delete('/timeSlots/:id', timeSlotController.deleteTimeSlot);
router.post('/bookSlot', timeSlotController.bookSlot); // Add this line

module.exports = router;
